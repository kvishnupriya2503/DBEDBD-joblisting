from pydantic import BaseModel


class SignupSchema(BaseModel):

    fullname: str
    phone: str
    email: str
    password: str
    role: int


class SigninSchema(BaseModel):

    email: str
    password: str


class JobSchema(BaseModel):

    title: str
    company: str
    location: str
    skills: str
    salary: float
    description: str


class ApplicationSchema(BaseModel):

    applicantName: str
    email: str
    resumeLink: str
    jobId: int