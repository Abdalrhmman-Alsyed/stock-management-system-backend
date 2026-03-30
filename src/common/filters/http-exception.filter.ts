import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ErrorResponse } from "../dto/api-response.dto";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const defaultMessage =
      exception instanceof HttpException
        ? exception.getResponse()
        : "Internal server error";

    let message: any = "";
    switch (status) {
      case 500:
        message = "Some data missing";
        break;
      case 401:
        message = "Unauthorized. Please Sign in";
        break;
      case 404:
        message = "Not found data";
        break;

      default:
        message = defaultMessage;
        break;
    }
    response
      .status(status)
      .json(new ErrorResponse(false, status, message, null));
  }
}
