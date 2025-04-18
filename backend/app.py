from fastapi import FastAPI
import sys
import os
from os.path import dirname, abspath

# Add the project root directory to the path
sys.path.append(dirname(dirname(abspath(__file__))))

from backend.routes.checklists import router as checklists_router
from fastapi.middleware.cors import CORSMiddleware
from db.checklists_interface import create_tables

# Initialize database tables
create_tables()

app = FastAPI(title="Checklist App API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(checklists_router)

@app.get("/")
async def root():
    return {
        "message": "Checklist App API is running",
        "endpoints": {
            "checklists": "http://127.0.0.1:8001/checklists"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)