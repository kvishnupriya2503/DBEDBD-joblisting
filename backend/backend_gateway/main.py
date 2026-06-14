from fastapi import FastAPI

from controller.authController import router as authRouter
from controller.jobsController import router as jobsRouter
from controller.applicationsController import router as appRouter

app = FastAPI()

app.include_router(authRouter)
app.include_router(jobsRouter)
app.include_router(appRouter)