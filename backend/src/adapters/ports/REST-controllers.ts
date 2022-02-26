export type IHTTPController = (
    params: any,
    body: any,
    query: any,
    headers: any
) => Promise<{ response: any; statusCode: number }>;

export type IHTTPMiddleware = (
    params: any,
    body: any,
    query: any,
    headers: any
) => void;

export type IHTTPControllerPathDescriptor = {
    resource: string;
    isParams: boolean;
    isOptional?: boolean;
}[];

export type IHTTPMethod = 'post' | 'get' | 'put' | 'delete' | 'patch';
export interface IHTTPControllerDescriptor<
    Controller,
    // Path = IHTTPControllerPathDescriptor
> {
    middleware?: string,
    method: IHTTPMethod;
    path: string;
    controller: Controller;
}
