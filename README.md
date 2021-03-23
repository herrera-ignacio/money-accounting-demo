# Money Accounting Exercise

## TOC

1. Install dependencies
2. Configuration
3. Run project
4. Walkthrough

## 1. Install dependencies

You only need to have docker installed: [Docker docs](https://docs.docker.com/engine/install/).

## 2. Configuration

Make sure you have ports 3000 and 3001 available as they are used by both backend and frontend. If you wish to change this, you need to modify this, please make sure to update `FRONTEND_CORS_URL` environment variable in `/backend/.env` and/or `REACT_APP_API_URL` in `/frontend/.env`.

## 3. Run project

From the root folder, run the following command to run projects in the background.

```
docker-compose up --build -d
```

If for any reason you wish to run projects without docker, you can simply run projects manually by navigating to both `backend` and `frontend` project folders using `yarn` or `npm`.

## 4. Walkthrough

* Frontend is a SPA that only lists a single user transaction, you can refresh transactions unsing the top-right button in the navbar.

* Backend API is documented in `backend/postman` using a Postman json collection.
