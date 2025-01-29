export interface IApiReturnType {
    error: boolean;
    errorMessage: string;
    data: any;
    successMessage: string;
    trace: any;
    statusCode: number;
}