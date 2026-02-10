# Vet Clinic – Full Stack (Docker Compose)

Pornește Postgres + FastAPI + React (Nginx) dintr-o singură comandă.

## Pași
1. Copiază `.env.example` în `.env` și ajustează variabilele (opțional):
   - `DATABASE_URL=postgresql+psycopg2://postgres:postgres@db:5432/vetdb`
   - `VITE_API_URL=http://localhost:8000`
2. Rulează: `docker compose up --build`
3. Acces:
   - Frontend: http://localhost:8080
   - Backend: http://localhost:8000 (Swagger: /docs)

## Notițe
- CORS este activat (allow_origins="*") pentru MVP.
- Creează primul utilizator la `/auth/signup`, apoi loghează-te în UI.
- Pentru producție: setează un `JWT_SECRET` sigur și restrânge CORS la domeniile tale.
