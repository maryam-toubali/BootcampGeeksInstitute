from fastapi import FastAPI
from app.auth.middleware import AuthMiddleware
from app.controllers import user_controller

app = FastAPI()
app.add_middleware(AuthMiddleware)
app.include_router(user_controller.router)
