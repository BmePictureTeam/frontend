import jwt from 'jsonwebtoken'

interface UserInfo {
  id: string;
  admin: boolean;
}

interface TokenPayload {
  user: UserInfo;
}

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
   

    var decodedtoken = jwt.decode(loginRes.token, {complete: true, json: true});
    var payload:TokenPayload = decodedtoken?.payload;
    if(payload.user.admin){
      Backend.token = loginRes.token;
    
      console.log(Backend.token);
      localStorage.setItem("token", Backend.token);
      localStorage.setItem("email", email);
    }else{
      alert("A webes felületen való belépéshez admin felhasználófiók szükséges.");
    }
    
    

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

  public async renameCategory(id: string, name: string): Promise<void> {
    this.checkToken();

    const response = await fetch(`${Backend.backendUrl}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Backend.token}`,
      },
      body: JSON.stringify({ name }),
    });

    this.checkResponseStatus(response);
  }

  public async deleteCategory(id: string): Promise<void> {
    this.checkToken();

    const response = await fetch(`${Backend.backendUrl}/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Backend.token}`,
      },
    });

    this.checkResponseStatus(response);
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Backend.token}`,
      },
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

export interface DeleteCategoryResponse {
  message: string;
}

export class BackendError extends Error {
  constructor(public response: Response) {
    super("backend returned an error");
  }
}
