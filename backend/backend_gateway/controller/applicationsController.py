from fastapi import APIRouter
from models.schemas import ApplicationSchema

import httpx

router = APIRouter(prefix="/applicationservice")

SPRING_URL = "http://localhost:8005/"


@router.post("/applyjob")
async def apply_job(application: ApplicationSchema):

    async with httpx.AsyncClient() as client:

        response = await client.post(
            SPRING_URL + "user/applyjob",
            json=application.model_dump()
        )

    return response.json()


@router.get("/allapplications")
async def all_applications():

    async with httpx.AsyncClient() as client:

        response = await client.get(
            SPRING_URL + "user/allapplications"
        )

    return response.json()