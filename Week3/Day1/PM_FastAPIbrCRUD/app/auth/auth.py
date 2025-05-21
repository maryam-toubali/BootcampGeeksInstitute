from fastapi import Request, HTTPException
from jose import jwt, JWTError

SECRET_KEY = "your-secret"
ALGORITHM = "HS256"

def get_current_user(request: Request):
    if not hasattr(request.state, "user"):
        raise HTTPException(status_code=403, detail="User not authenticated")
    return request.state.user
