export default interface Result<T> {
    success: boolean;
    message: string;
    data?: T | null;
}