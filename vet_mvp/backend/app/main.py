from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from . import models, schemas, crud
from .auth import create_access_token, get_current_user
from datetime import timedelta

app = FastAPI(title="Vet Clinic MVP API")

# CORS larg pentru MVP
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/auth/signup", response_model=schemas.UserOut)
def signup(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_email(db, payload.email):
        raise HTTPException(status_code=400, detail="Email deja folosit")
    user = crud.create_user(db, payload)
    return user

@app.post("/auth/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, form_data.username)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credențiale invalide")
    from .crud import verify_password
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credențiale invalide")
    access_token = create_access_token(data={"sub": user.email}, expires_delta=timedelta(minutes=120))
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/owners", response_model=schemas.OwnerOut)
def create_owner(payload: schemas.OwnerCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return crud.create_owner(db, payload)

@app.get("/owners", response_model=list[schemas.OwnerOut])
def list_owners(skip: int = 0, limit: int = 50, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return crud.list_owners(db, skip, limit)

@app.post("/pets", response_model=schemas.PetOut)
def create_pet(payload: schemas.PetCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return crud.create_pet(db, payload)

@app.get("/pets", response_model=list[schemas.PetOut])
def list_pets(skip: int = 0, limit: int = 50, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return crud.list_pets(db, skip, limit)

@app.post("/appointments", response_model=schemas.AppointmentOut)
def create_appointment(payload: schemas.AppointmentCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return crud.create_appointment(db, payload)

@app.get("/appointments", response_model=list[schemas.AppointmentOut])
def list_appointments(skip: int = 0, limit: int = 50, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return crud.list_appointments(db, skip, limit)

@app.post("/consultations", response_model=schemas.ConsultationOut)
def create_consultation(payload: schemas.ConsultationCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return crud.create_consultation(db, payload)

@app.get("/consultations", response_model=list[schemas.ConsultationOut])
def list_consultations(skip: int = 0, limit: int = 50, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return crud.list_consultations(db, skip, limit)

@app.post("/invoices", response_model=schemas.InvoiceOut)
def create_invoice(payload: schemas.InvoiceCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return crud.create_invoice(db, payload)

@app.get("/invoices", response_model=list[schemas.InvoiceOut])
def list_invoices(skip: int = 0, limit: int = 50, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return crud.list_invoices(db, skip, limit)
