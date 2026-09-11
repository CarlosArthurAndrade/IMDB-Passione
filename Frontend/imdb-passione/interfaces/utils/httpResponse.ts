export interface HttpResponse<T> {
    statusCode: number,
    httpStatus: string,
    message?: string,
    data?: T
}