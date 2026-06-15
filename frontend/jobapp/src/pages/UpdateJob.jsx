import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateJob() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [skills, setSkills] = useState("");
    const [salary, setSalary] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        loadJob();
    }, []);

    const loadJob = async () => {

        try {

            const response = await fetch(
                `http://localhost:5000/api/jobs/${id}`
            );

            const job = await response.json();

            setTitle(job.title);
            setCompany(job.company);
            setLocation(job.location);
            setSkills(job.skills?.join(", "));
            setSalary(job.salary);
            setDescription(job.description);

        } catch (err) {
            console.log(err);
        }
    };

    const updateJob = async (e) => {

        e.preventDefault();

        try {

            await fetch(
                `http://localhost:5000/api/jobs/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        title,
                        company,
                        location,
                        skills: skills.split(",").map(skill => skill.trim()),
                        salary,
                        description
                    })
                }
            );

            alert("Updated successfully");

            navigate("/jobs");

        } catch (err) {

            console.log(err);

        }
    };

    return (
        <div>

            <h1>Update Job</h1>

            <form onSubmit={updateJob}>

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <input
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                />

                <input
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button>
                    Update
                </button>

            </form>

        </div>
    );
}

export default UpdateJob;