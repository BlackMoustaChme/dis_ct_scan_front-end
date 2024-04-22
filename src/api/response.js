export class Response {
    body;
    status;
    statusSet = {
        401: 401,
        200: 200,
        202: 202,
        204: 204,
        400: 400,
        409: 409,
        422: 422
    };

    constructor(status, body) {
        this.status = this.statusSet[status];
        this.body = body;
    }

    setBody(body) {
        this.body = body;
    }

    setStatus(status) {
        this.status = this.statusSet[status];
    }

    getBody() {
        return this.body;
    }

    getStatus() {
        return this.status;
    }
}