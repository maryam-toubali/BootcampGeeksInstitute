# Shared dependencies (e.g., getting the current user from token)

from fastapi import Depends, HTTPException, Request
from .auth import get_current_active_user, get_current_active_admin

def get_current_user(user=Depends(get_current_active_user)):
    return user

def get_admin_user(user=Depends(get_current_active_admin)):
    return user
