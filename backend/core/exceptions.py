from fastapi import HTTPException, status

class BaseAppException(HTTPException):
    def __init__(self, status_code: int, detail: str, message: str = None):
        super().__init__(status_code=status_code, detail=detail)
        self.message = message or detail

class UnauthorizedException(BaseAppException):
    def __init__(self, detail: str = "Unauthorized access"):
        super().__init__(status_code=status_code.HTTP_401_UNAUTHORIZED, detail=detail)

class ForbiddenException(BaseAppException):
    def __init__(self, detail: str = "Forbidden access"):
        super().__init__(status_code=status_code.HTTP_403_FORBIDDEN, detail=detail)

class NotFoundException(BaseAppException):
    def __init__(self, detail: str = "Resource not found"):
        super().__init__(status_code=status_code.HTTP_404_NOT_FOUND, detail=detail)

class ValidationException(BaseAppException):
    def __init__(self, detail: str = "Validation failed"):
        super().__init__(status_code=status_code.HTTP_422_UNPROCESSABLE_ENTITY, detail=detail)
