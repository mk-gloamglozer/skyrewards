export class TechnicalError extends Error{
    readonly errorClass:string = "TechnicalError"
}

export class InvalidAccountError extends Error{
    readonly errorClass:string = "InvalidAccountError"
}