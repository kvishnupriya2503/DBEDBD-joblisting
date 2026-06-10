import { useEffect, useState } from "react";
import API from "../services/api";
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
            const res = await API.get("/user/alljobs");
            setJobs(res.data || []);
        } catch (error) {
            console.log(error);
            setMessage("Unable to load jobs.");
        }
    };

    const deleteJob = async (id) => {
        try {
            await API.delete(`/user/deletejob/${user.role}/${id}`);
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
                <p>All jobs added by admin or manager are shown here.</p>
            </div>

            {message && <p className="status-message">{message}</p>}

            <div className="table-panel">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Job ID</th>
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
                            <tr key={job.id}>
                                <td>{job.id}</td>
                                <td>{job.title}</td>
                                <td>{job.company}</td>
                                <td>{job.location}</td>
                                <td>{job.skills}</td>
                                <td>{job.salary}</td>
                                <td>
                                    {user.role === 3 && (
                                        <Link to={`/apply/${job.id}`}>
                                            <button className="small-button">Apply</button>
                                        </Link>
                                    )}

                                    {user.role === 1 && (
                                        <button
                                            className="danger-button"
                                            onClick={() => deleteJob(job.id)}
                                        >
                                            Delete
                                        </button>
                                    )}

                                    {user.role === 2 && (
                                        <span className="muted-text">Visible</span>
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