from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from jose import jwt, JWTError

SECRET_KEY = "your-secret"
ALGORITHM = "HS256"

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        public_paths = ["/login", "/signup", "/docs", "/openapi.json"]
        if any(request.url.path.startswith(path) for path in public_paths):
            return await call_next(request)

        token = request.headers.get("Authorization")
        if not token:
            raise HTTPException(status_code=403, detail="No auth token provided")

        try:
            scheme, jwt_token = token.split()
            if scheme.lower() != "bearer":
                raise HTTPException(status_code=403, detail="Invalid token scheme")
            payload = jwt.decode(jwt_token, SECRET_KEY, algorithms=[ALGORITHM])
            request.state.user = payload
        except (JWTError, ValueError):
            raise HTTPException(status_code=403, detail="Invalid or expired token")

        return await call_next(request)
