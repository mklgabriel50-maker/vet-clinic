from pydantic import BaseModel, EmailStr, Field, constr
from typing import Optional
from datetime import date, time, datetime
from enum import Enum

class UserRole(str, Enum):
    admin = "admin"
    doctor = "doctor"
    assistant = "assistant"

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: UserRole = UserRole.assistant

class UserCreate(UserBase):
    # limităm lungimea parolei pentru compatibilitate cu bcrypt (max 72 bytes)
    password: constr(min_length=6, max_length=72)

class UserOut(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class OwnerBase(BaseModel):
    name: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None

class OwnerCreate(OwnerBase):
    pass

class OwnerOut(OwnerBase):
    id: int
    class Config:
        from_attributes = True

class PetSpecies(str, Enum):
    dog = "dog"
    cat = "cat"
    other = "other"

class PetBase(BaseModel):
    name: str
    species: PetSpecies = PetSpecies.dog
    breed: Optional[str] = None
    sex: Optional[str] = None
    age_years: Optional[int] = None
    chip: Optional[str] = None
    owner_id: int

class PetCreate(PetBase):
    pass

class PetOut(PetBase):
    id: int
    class Config:
        from_attributes = True

class AppointmentBase(BaseModel):
    date: date
    time: time
    doctor_id: Optional[int] = None   # <- acum e opțional
    pet_id: int
    reason: Optional[str] = None
    notes: Optional[str] = None
    
class AppointmentCreate(AppointmentBase):
    pass

class AppointmentOut(AppointmentBase):
    id: int
    class Config:
        from_attributes = True

class ConsultationBase(BaseModel):
    pet_id: int
    doctor_id: int
    date: Optional[datetime] = None
    symptoms: Optional[str] = None
    diagnosis: Optional[str] = None
    treatment: Optional[str] = None

class ConsultationCreate(ConsultationBase):
    pass

class ConsultationOut(ConsultationBase):
    id: int
    date: datetime
    class Config:
        from_attributes = True

class InvoiceBase(BaseModel):
    owner_id: Optional[int] = None
    amount: float
    description: Optional[str] = None

class InvoiceCreate(InvoiceBase):
    pass

class InvoiceOut(InvoiceBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[EmailStr] = None
