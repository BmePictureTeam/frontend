export class Backend {
  private static token: string | null = localStorage.getItem("token");
  private static backendUrl = process.env.REACT_APP_API_URL as string;

  public static setToken(token: string | null) {
    Backend.token = token;
  }

  public static isLoggedIn() {
    return typeof Backend.token !== "undefined" && Backend.token !== null;
  }

  public async login(email: string, password: string) {
    const response = await fetch(`${Backend.backendUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    this.checkResponseStatus(response);

    const loginRes = (await response.json()) as LoginResponse;

    Backend.token = loginRes.token;
    localStorage.setItem("token", Backend.token);
  }

  public async registration(email: string, password: string) {
    const response = await fetch(`${Backend.backendUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    this.checkResponseStatus(response);
  }

  public async createCategory(name: string): Promise<CreateCategoryResponse> {
    this.checkToken();

    const response = await fetch(`${Backend.backendUrl}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Backend.token}`,
      },
      body: JSON.stringify({ name }),
    });

    this.checkResponseStatus(response);

    return await response.json();
  }







  private checkResponseStatus(response: Response) {
    if (response.status >= 400) {
      throw new BackendError(response);
    }
  }

  private checkToken() {
    if (typeof Backend.token === "undefined") {
      throw new Error("token must be set");
    }
  }


  public async getCategories(): Promise<GetCategoriesResponse> {
    this.checkToken();

    const response = await fetch(`${Backend.backendUrl}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Backend.token}`,
      }
    });

    this.checkResponseStatus(response);

    return await response.json();
  }


}

export interface Category {
  id: string;
  image_count: number;
  name: string;
}

interface GetCategoriesResponse {
  categories: Category[];
}


export interface LoginResponse {
  token: string;
}

export interface CreateCategoryResponse {
  id: string;
}





export class BackendError extends Error {
  constructor(public response: Response) {
    super("backend returned an error");
  }
}
