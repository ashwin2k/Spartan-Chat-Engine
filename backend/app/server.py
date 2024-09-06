from fastapi import FastAPI
from views import chat, login, file
from fastapi.middleware.cors import CORSMiddleware
from db import mongo  # initialize DB

app = FastAPI()

app.include_router(chat.router)
app.include_router(login.router, prefix="/login")
app.include_router(file.router, prefix="/file")


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as needed
    allow_credentials=True,
    allow_methods=["*"],  # Adjust this as needed
    allow_headers=["*"],  # Adjust this as needed
)

if __name__ == "__main__":
    import uvicorn

    # "uvicorn app.server:app --reload" to run the app
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
