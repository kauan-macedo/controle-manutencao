export const API_URL = "http://localhost:8080"

export interface APIResponse<T> {
  status: number;
  message: string;
  body: T;
} 


export class APIRequest<T> {
  public route: string;
  public endpoint: string | null = null; 
  public body: T | null;
  public query: T | null;

  constructor(route: string, endpoint: string | null, body: T | null, query: T | null) {
    this.route = route;
    this.endpoint = endpoint ?? API_URL
    this.body = body;
    this.query = query;  
  }
}

function responseFrom<T>(j:any): APIResponse<T> {
  let resp = j as APIResponse<T>
  resp.body = j.body as T
  return resp
}

export type Handler<T> = (resp: APIResponse<T>) => void;

let defaultHeaders = {
  'Content-Type': "application/json",
}

export function POST<A,T>(req: APIRequest<A>, handler: Handler<T>) {
  fetch(`${req.endpoint}/${req.route}`,{
    body: req.body == null ? "{}" : JSON.stringify(req.body),
    method: "POST",
    headers: defaultHeaders,
    credentials: 'include',
  }).then(x => x.json()).then(j => handler(responseFrom(j)))
}

export function PUT<A,T>(req: APIRequest<A>, handler: Handler<T>) {
  fetch(`${req.endpoint}/${req.route}`,{
    body: req.body == null ? "{}" : JSON.stringify(req.body),
    method: "PUT",
    headers: defaultHeaders,
    credentials: 'include',
  }).then(x => x.json()).then(j => handler(responseFrom(j)))
}

export function GET<A,T>(req: APIRequest<A>, handler: Handler<T>) {
  let filtered: Record<string,any> = req.query == null ? {} : Object.fromEntries(
    Object.entries(req.query).filter(([_, value]) => value != null && value != undefined && value != "")
  );
  fetch(`${req.endpoint}/${req.route}${req.query != null ? "?" + new URLSearchParams(filtered).toString() : ""}`, {
    method: "GET",
    headers: defaultHeaders,
    credentials: 'include',
  }).then(x => x.json()).then(j => handler(responseFrom(j)))
}