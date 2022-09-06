export enum ErrorMessage {
  NOT_FOUND = "Not Found",
  UNAUTHORIZED = "Unauthorized",
  PERMISSION_DENIED = "Permission Denied",
  BAD_REQUEST = "Bad Request",
}

export enum ErrorResponseCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
