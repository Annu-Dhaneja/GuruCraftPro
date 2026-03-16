# Render Login Fix Guide

This guide ensures admin login works on Render + Netlify without paid shell access.

## 1) Backend env vars (Render web service)

Set each key as a separate Environment Variable row:

- `DATABASE_URL=postgresql://<user>:<pass>@<render-internal-host>/<db_name>`
- `ADMIN_USERNAME_1=admin1`
- `ADMIN_PASSWORD_1=Admin12345`
- `ADMIN_USERNAME_2=admin2`
- `ADMIN_PASSWORD_2=Admin12345`
- `JWT_SECRET_KEY=<long-random-secret>`
- `NANO_BANANA_API_KEY=<optional>`
- `OPENAI_API_KEY=<optional>`

Notes:
- Use **internal** DB URL for backend service on Render.
- Do not paste all variables into one box.
- Do not duplicate `JWT_SECRET_KEY`.

## 2) Backend commands

- Pre-Deploy Command: `python seed_db.py`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 3) Deploy

Run **Manual Deploy -> Clear build cache & deploy**.

## 4) Verify backend

Open:

- `https://virtual-trys.onrender.com/`
- `https://virtual-trys.onrender.com/api/v1/auth/users`

Expected:
- Root endpoint returns status `ok`.
- `/users` returns at least one admin user (not `[]`).

## 5) Verify login by API (POST only)

Browser `GET /api/v1/auth/login` is only a guide endpoint.
Real login must use `POST`.

Windows CMD example:

```cmd
curl -X POST "https://virtual-trys.onrender.com/api/v1/auth/login" ^
  -H "Content-Type: application/x-www-form-urlencoded" ^
  -d "username=admin1&password=Admin12345"
```

Success response contains:
- `access_token`
- `token_type`

## 6) Verify frontend (Netlify)

Set frontend env var on Netlify:

- `NEXT_PUBLIC_API_URL=https://virtual-trys.onrender.com`

Redeploy Netlify.
Then clear local storage token and login again.

## 7) If login still returns 401

1. Check `/api/v1/auth/users` first.
2. If it is `[]`, env vars are not attached to the correct backend service.
3. If users exist but 401 persists, set temporary simple credentials (`admin1` / `Admin12345`) and redeploy.
4. Confirm API POST login works before testing UI.

## 8) Security after recovery

Rotate these secrets after final success:
- DB password/credentials
- `JWT_SECRET_KEY`
- Admin passwords

