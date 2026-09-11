import type { Code } from "../enums/code.enum.js";
import type { Status } from "../enums/status.enum.js";

export class HttpResponse<T> {
    private timeStamp: string;

    constructor(private statusCode: Code, private httpStatus: Status, private message?: string, private data?: T) {
        this.timeStamp = new Date().toLocaleString();
        this.statusCode = statusCode;
        this.httpStatus = httpStatus;
        this.message = message;
        this.data = data
    }
}