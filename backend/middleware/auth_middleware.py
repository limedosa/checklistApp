from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from backend.services.authentication_service import AuthenticationService

security = HTTPBearer()

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Dependency to verify JWT token in Authorization header.
    Returns decoded token payload if valid.
    """
    token = credentials.credentials
    decoded = AuthenticationService.verify_token(token)
    
    if "error" in decoded:
        raise HTTPException(
            status_code=401,
            detail=decoded["error"],
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return decoded