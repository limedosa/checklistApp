from fastapi import APIRouter, HTTPException, Query
from typing import Dict, List, Any, Optional
from pydantic import BaseModel, Field
from datetime import datetime

from backend.db.checklists_interface import (
    create_checklist, get_checklist, update_checklist, 
    delete_checklist, list_checklists
)

router = APIRouter(
    prefix="/checklists",
    tags=["checklists"],
)

class FileItem(BaseModel):
    id: str
    name: str
    files: List[Dict[str, Any]] = []

class CategoryItem(BaseModel):
    id: str
    name: str
    items: List[FileItem] = []

class ChecklistBase(BaseModel):
    name: str
    categories: List[CategoryItem] = []
    isCloned: Optional[bool] = None
    clonedFrom: Optional[str] = None
    userEmail: Optional[str] = None  # Add this field

class ChecklistCreate(ChecklistBase):
    pass

class ChecklistUpdate(BaseModel):
    name: Optional[str] = None
    categories: Optional[List[CategoryItem]] = None
    isCloned: Optional[bool] = None
    clonedFrom: Optional[str] = None

class ChecklistResponse(ChecklistBase):
    id: str
    created_at: str
    updated_at: str

@router.post("/", response_model=ChecklistResponse)
async def create_new_checklist(checklist: ChecklistCreate):
    """Create a new checklist"""
    # Use dict() instead of model_dump() for compatibility with older Pydantic versions
    data = checklist.dict()
    checklist_id = create_checklist(data)
    return get_checklist(checklist_id)

@router.get("/", response_model=List[ChecklistResponse])
async def get_all_checklists():
    """Get all checklists"""
    return list_checklists()

@router.get("/{checklist_id}", response_model=ChecklistResponse)
async def get_one_checklist(checklist_id: str):
    """Get a specific checklist by ID"""
    checklist = get_checklist(checklist_id)
    if not checklist:
        raise HTTPException(status_code=404, detail="Checklist not found")
    return checklist

@router.put("/{checklist_id}", response_model=ChecklistResponse)
async def update_one_checklist(checklist_id: str, checklist_update: ChecklistUpdate):
    """Update a specific checklist"""
    existing_checklist = get_checklist(checklist_id)
    if not existing_checklist:
        raise HTTPException(status_code=404, detail="Checklist not found")
    
    # Use dict() instead of model_dump() for compatibility with older Pydantic versions
    update_data = {k: v for k, v in checklist_update.dict().items() if v is not None}
    
    success = update_checklist(checklist_id, update_data)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to update checklist")
    
    return get_checklist(checklist_id)

@router.delete("/{checklist_id}")
async def delete_one_checklist(checklist_id: str):
    """Delete a specific checklist"""
    checklist = get_checklist(checklist_id)
    if not checklist:
        raise HTTPException(status_code=404, detail="Checklist not found")
    
    success = delete_checklist(checklist_id)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to delete checklist")
    
    return {"message": "Checklist deleted successfully"}

@router.post("/{checklist_id}/clone", response_model=ChecklistResponse)
async def clone_checklist(checklist_id: str, new_name: str = Query(None)):
    """Clone an existing checklist"""
    original_checklist = get_checklist(checklist_id)
    if not original_checklist:
        raise HTTPException(status_code=404, detail="Checklist not found")
    
    # Create a deep copy
    cloned_data = dict(original_checklist)
    
    # Remove the original ID and update fields
    cloned_data.pop("id", None)
    cloned_data["isCloned"] = True
    cloned_data["clonedFrom"] = checklist_id
    # Keep the userEmail from the original checklist
    
    # Set a new name if provided, otherwise add "(Copy)" to the original name
    if new_name:
        cloned_data["name"] = new_name
    else:
        cloned_data["name"] = f"{original_checklist['name']} (Copy)"
    
    new_id = create_checklist(cloned_data)
    return get_checklist(new_id)