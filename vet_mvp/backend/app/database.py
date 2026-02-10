from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# ==============================
# DATABASE URL
# fallback pe SQLite dacă nu există variabilă de mediu
# ==============================
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./vet.db")

# ==============================
# SQLITE FIX
# SQLite are nevoie de check_same_thread=False
# ==============================
connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

# ==============================
# ENGINE
# ==============================
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    connect_args=connect_args
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

# ==============================
# DEPENDENCY
# ==============================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()