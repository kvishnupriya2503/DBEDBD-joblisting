from fastapi import APIRouter
from models.schemas import JobSchema

import httpx

router = APIRouter(prefix="/jobservice")

SPRING_URL = "http://localhost:8005/"


@router.post("/addjob")
async def add_job(job: JobSchema):

    async with httpx.AsyncClient() as client:

        response = await client.post(
            SPRING_URL + "user/addjob",
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


@router.delete("/deletejob/{id}")
async def delete_job(id: int):

    async with httpx.AsyncClient() as client:

        response = await client.delete(
            SPRING_URL + f"user/deletejob/{id}"
        )

    return response.json()