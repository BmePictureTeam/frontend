export class Backend {
  private static token: string | undefined;
  private static backendUrl = process.env.REACT_APP_API_URL as string;

  public static setToken(token: string) {
    Backend.token = token;
  }
  
  public static isLoggedIn() {
    return typeof this.token !== "undefined";
  }

  public async login(email: string, password: string) {
    const response = await fetch(`${Backend.backendUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const loginRes = (await response.json()) as LoginResponse;

    Backend.token = loginRes.token;
  }


  public async registration(email: string, password: string) {

  //  const response = await fetch(`${Backend.backendUrl}/auth/login`, {
  //    method: "POST",
  //    headers: {
  //      "Content-Type": "application/json",
  //    },
  //    body: JSON.stringify({ email, password }),
  //  });

 //   const loginRes = (await response.json()) as LoginResponse;

 //   Backend.token = loginRes.token;

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

    return await response.json();
  }

  private checkToken() {
    if (typeof Backend.token === "undefined") {
      throw new Error("token must be set");
    }
  }
}

export interface LoginResponse {
  token: string;
}

export interface CreateCategoryResponse {
  id: string;
}
