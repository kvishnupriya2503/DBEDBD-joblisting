from fastapi import APIRouter
from models.schemas import ApplicationSchema
import httpx

router = APIRouter(prefix="/applicationservice")

SPRING_URL = "http://localhost:8005/"


@router.post("/applyjob/{role}")
async def apply_job(role: int, application: ApplicationSchema):

    async with httpx.AsyncClient() as client:

        response = await client.post(
            SPRING_URL + f"user/applyjob/{role}",
            json=application.model_dump()
        )

    return response.json()


@router.get("/allapplications/{role}")
async def all_applications(role: int):

    async with httpx.AsyncClient() as client:

        response = await client.get(
            SPRING_URL + f"user/allapplications/{role}"
        )

    return response.json()