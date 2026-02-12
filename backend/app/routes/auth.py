"""
Authentication routes (register / login).

TODO — Contributors, implement the following:
  1. Hash passwords using bcrypt on registration
  2. Store user in the database via SQLAlchemy
  3. Verify credentials on login
  4. Generate and return a JWT token (use python-jose or PyJWT)
  5. Create a get_current_user dependency for protected routes
"""

from fastapi import APIRouter, HTTPException, status

from app.schemas.schemas import UserCreate, UserResponse, TokenResponse

router = APIRouter()


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate):
    """Register a new user."""
    # TODO: Implement registration logic
    raise HTTPException(status_code=501, detail="Registration not yet implemented")


@router.post("/login", response_model=TokenResponse)
async def login(user_in: UserCreate):
    """Authenticate user and return a JWT token."""
    # TODO: Implement login logic
    raise HTTPException(status_code=501, detail="Login not yet implemented")
