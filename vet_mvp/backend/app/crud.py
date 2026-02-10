from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    db_user = models.User(
        email=user.email,
        full_name=user.full_name,
        hashed_password=get_password_hash(user.password),
        role=models.UserRole(user.role.value),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_owner(db: Session, owner: schemas.OwnerCreate) -> models.Owner:
    obj = models.Owner(**owner.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def list_owners(db: Session, skip=0, limit=50):
    return db.query(models.Owner).offset(skip).limit(limit).all()

def create_pet(db: Session, pet: schemas.PetCreate) -> models.Pet:
    obj = models.Pet(**pet.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def list_pets(db: Session, skip=0, limit=50):
    return db.query(models.Pet).offset(skip).limit(limit).all()

def create_appointment(db: Session, appt: schemas.AppointmentCreate) -> models.Appointment:
    obj = models.Appointment(**appt.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def list_appointments(db: Session, skip=0, limit=50):
    return db.query(models.Appointment).offset(skip).limit(limit).all()

def create_consultation(db: Session, c: schemas.ConsultationCreate) -> models.Consultation:
    data = c.model_dump()
    obj = models.Consultation(**data)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def list_consultations(db: Session, skip=0, limit=50):
    return db.query(models.Consultation).offset(skip).limit(limit).all()

def create_invoice(db: Session, inv: schemas.InvoiceCreate) -> models.Invoice:
    obj = models.Invoice(**inv.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def list_invoices(db: Session, skip=0, limit=50):
    return db.query(models.Invoice).offset(skip).limit(limit).all()
    
    from sqlalchemy.orm import Session
from . import models
from passlib.context import CryptContext

_pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_or_create_default_doctor(db: Session) -> models.User:
    # caută un user cu rol doctor
    user = db.query(models.User).filter(models.User.role == models.UserRole.doctor).first()
    if user:
        return user
    # crează unul implicit (parola e irelevantă dacă ai DISABLE_AUTH=1)
    user = models.User(
        email="doctor.default@local",
        full_name="Default Doctor",
        role=models.UserRole.doctor,
        password_hash=_pwd.hash("DevDoc1")
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
