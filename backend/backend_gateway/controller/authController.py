from fastapi import APIRouter
from models.schemas import SignupSchema, SigninSchema

import httpx

router = APIRouter(prefix="/authservice")

SPRING_URL = "http://localhost:8005/"


@router.post("/signup")
async def signup(U: SignupSchema):

    async with httpx.AsyncClient() as client:

        response = await client.post(
            SPRING_URL + "user/signup",
            json=U.model_dump()
        )

    return response.json()


@router.post("/signin")
async def signin(U: SigninSchema):

    async with httpx.AsyncClient() as client:

        response = await client.post(
            SPRING_URL + "user/signin",
            json=U.model_dump()
        )

    return response.json()