export default class ApiErrors extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiErrors(401, 'Пользователь не авторзован')
    }

    static BadRequest(message, errors = []) {
        return new ApiErrors(400, message, errors)
    }

}