import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResponse, SuccessResponse } from "../dto/api-response.dto";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<ApiResponse> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        let message = "";

        if (data instanceof ApiResponse) {
          return data;
        }

        switch (request.method) {
          case "POST":
            message = "Resource Created Successfully";
            break;
          case "GET":
            message = "Resource Got Successfully";
            break;
          case "DELETE":
            message = "Resource Deleted Successfully";
            break;

          case "PUT":
            message = "Resource Updated Successfully";
            break;

          default:
            message = "Success";
            break;
        }

        return new SuccessResponse(true, response.statusCode, message, data);
      })
    );
  }
}
