import { HttpStatus } from "@nestjs/common";

export class ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: any[]; // null

  constructor(success, statusCode, message, data) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export class SuccessResponse extends ApiResponse {
  constructor(
    success = true,
    statusCode: number = HttpStatus.OK,
    message = "Success",
    data
  ) {
    super(
      (success = success),
      (statusCode = statusCode),
      (message = message),
      (data = data)
    );
  }
}

export class ErrorResponse extends ApiResponse {
  constructor(
    success = false,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    message,
    data
  ) {
    super(
      (success = success),
      (statusCode = statusCode),
      (message = message),
      (data = null)
    );
  }
}
