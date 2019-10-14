export interface ResponseError {
    fieldErrors:
    [{
        code: string,
        fieldPath: string,
        message: string,
        params: any
    }, {
        code: string,
        fieldPath: string,
        message: string,
        params: any
    }]
}