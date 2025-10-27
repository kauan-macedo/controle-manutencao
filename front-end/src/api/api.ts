export const API_URL = "https://controlemanutencao.betoni.dev"
//export const API_URL = "http://localhost:8097"


export interface APIResponse<T> {
  error: boolean;
  message: string;
  body: T;
}


export class APIRequest<T> {
  public route: string;
  public endpoint?: string = undefined;
  public body?: T = undefined;
  public query?: T = undefined;

  constructor(route: string, endpoint?: string, body?: T, query?: T) {
    this.route = route;
    this.endpoint = endpoint ?? API_URL
    this.body = body;
    this.query = query;
  }
}

function responseFrom<T>(j: any): APIResponse<T> {
  let resp = j as APIResponse<T>
  resp.body = j.body as T
  return resp
}

export type Handler<T> = (resp: APIResponse<T>) => void;

let defaultHeaders = {
  'Content-Type': "application/json",
}

function checkUnauthorized(resp: Response) {
  if(resp.status == 401) {
    window.location.href="/login";
  }
}

export async function GET_PROMISED<A, T>(req: APIRequest<A>): Promise<APIResponse<T>> {
  let filtered: Record<string, any> = req.query == null ? {} : Object.fromEntries(
    Object.entries(req.query).filter(([_, value]) => value != null && value != undefined && value !== "")
  );
  const url = `${req.endpoint ?? API_URL}/${req.route}${req.query != null ? "?" + new URLSearchParams(filtered).toString() : ""}`;
  const response = await fetch(url, {
    method: "GET",
    headers: defaultHeaders,
    credentials: 'include',
  });
  checkUnauthorized(response);
  const json = await response.json();
  return responseFrom(json);
}

export async function POST_PROMISED<A, T>(req: APIRequest<A>): Promise<APIResponse<T>> {

  const requestBody = req.body == null ? "{}" : JSON.stringify(req.body);
  const url = `${req.endpoint ?? API_URL}/${req.route}`;

  const response = await fetch(url, {
    body: requestBody,
    method: "POST",
    headers: defaultHeaders,
    credentials: 'include',
  });
  checkUnauthorized(response);
  const json = await response.json();
  return responseFrom(json);
}

export async function PUT_PROMISED<A, T>(req: APIRequest<A>): Promise<APIResponse<T>> {
  const requestBody = req.body == null ? "{}" : JSON.stringify(req.body);
  const url = `${req.endpoint ?? API_URL}/${req.route}`;
  const response = await fetch(url, {
    body: requestBody,
    method: "PUT",
    headers: defaultHeaders,
    credentials: 'include',
  });
  checkUnauthorized(response);
  const json = await response.json();
  return responseFrom(json);
}

export async function DELETE_PROMISED<A, T>(req: APIRequest<A>): Promise<APIResponse<T>> {
  const url = `${req.endpoint ?? API_URL}/${req.route}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: defaultHeaders,
    credentials: 'include',
  });
  checkUnauthorized(response);
  let json = await response.json();
  return responseFrom(json);
}