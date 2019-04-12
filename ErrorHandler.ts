import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";
import { ErrorRequestHandler } from "express";

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    error: ErrorRequestHandler = (err, req, res) => res.status(err.status || 500).send(err);
}
