from fastapi import APIRouter
from models.schemas import JobSchema
import httpx

router = APIRouter(prefix="/jobservice")

SPRING_URL = "http://localhost:8005/"


@router.post("/addjob/{role}")
async def add_job(role: int, job: JobSchema):

    async with httpx.AsyncClient() as client:

        response = await client.post(
            SPRING_URL + f"user/addjob/{role}",
            json=job.model_dump()
        )

    return response.json()


@router.get("/alljobs")
async def all_jobs():

    async with httpx.AsyncClient() as client:

        response = await client.get(
            SPRING_URL + "user/alljobs"
        )

    return response.json()


@router.delete("/deletejob/{role}/{id}")
async def delete_job(role: int, id: int):

    async with httpx.AsyncClient() as client:

        response = await client.delete(
            SPRING_URL + f"user/deletejob/{role}/{id}"
        )

    return response.json()


@router.put("/updatejob/{id}")
async def update_job(id: int, job: JobSchema):

    async with httpx.AsyncClient() as client:

        response = await client.put(
            SPRING_URL + f"user/updatejob/{id}",
            json=job.model_dump()
        )

    return response.json()