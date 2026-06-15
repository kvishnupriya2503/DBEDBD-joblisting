import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddJob() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [skills, setSkills] = useState("");
    const [salary, setSalary] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

   const addJob = async (e) => {
    e.preventDefault();
    setMessage("");

    if (
        !title.trim() ||
        !company.trim() ||
        !location.trim() ||
        !skills.trim() ||
        !salary ||
        !description.trim()
    ) {
        setMessage("Please fill all job details.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/jobs", {
            method: "POST",
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
        });

        if (!response.ok) {
            throw new Error("Failed to add job");
        }

        setMessage("Job added successfully.");
        navigate("/jobs");

    } catch (error) {
        console.error(error);
        setMessage("Unable to add job.");
    }
};

    return (
        <div>
            <div className="page-header">
                <h1>Add Job</h1>
                <p>Create a job once and it will appear for admin, recruiters, and jobseekers.</p>
            </div>

            <form className="form-panel" onSubmit={addJob}>
                <div className="form-grid">
                    <label>
                        Job Title
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>

                    <label>
                        Company
                        <input
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </label>

                    <label>
                        Location
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </label>

                    <label>
                        Skills
                        <input
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                        />
                    </label>

                    <label>
                        Salary
                        <input
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </label>

                    <label className="full-width-field">
                        Description
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                </div>

                {message && <p className="status-message">{message}</p>}

                <button className="primary-button" type="submit">
                    Add Job
                </button>
            </form>
        </div>
    );
}

export default AddJob;