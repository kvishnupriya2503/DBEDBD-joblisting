import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllJobs() {
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/jobs");
            const data = await response.json();

            setJobs(data || []);
        } catch (error) {
            console.log(error);
            setMessage("Unable to load jobs.");
        }
    };

    const deleteJob = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/jobs/${id}`, {
                method: "DELETE"
            });

            setMessage("Job deleted successfully.");
            getJobs();

        } catch (error) {
            console.log(error);
            setMessage("Unable to delete job.");
        }
    };

    return (
        <div>
            <div className="page-header">
                <h1>All Jobs</h1>
            </div>

            {message && <p>{message}</p>}

            <div className="table-panel">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Company</th>
                            <th>Location</th>
                            <th>Skills</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.jobId}>
                                <td>{job.jobId}</td>
                                <td>{job.title}</td>
                                <td>{job.company}</td>
                                <td>{job.location}</td>
                                <td>{job.skills?.join(", ")}</td>
                                <td>{job.salary}</td>

                                <td>

                                    {user.role === 3 && (
                                        <Link to={`/apply/${job._id}`}>
                                            <button className="small-button">
                                                Apply
                                            </button>
                                        </Link>
                                    )}

                                    {(user.role === 1 || user.role === 2) && (
                                        <button
                                            className="danger-button"
                                            onClick={() => deleteJob(job._id)}
                                        >
                                            Delete
                                        </button>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default AllJobs;