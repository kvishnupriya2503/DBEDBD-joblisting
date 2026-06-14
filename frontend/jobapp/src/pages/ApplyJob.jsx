import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function ApplyJob() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [job, setJob] = useState(null);
    const [applicantName, setApplicantName] = useState(user?.fullname || "");
    const [email, setEmail] = useState(user?.email || "");
    const [resumeLink, setResumeLink] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        API.get("/user/alljobs")
            .then((res) => {
                const found = res.data.find(j => String(j.id) === String(id));
                setJob(found);
            })
            .catch(console.log);
    }, [id]);

    const apply = async (e) => {
        e.preventDefault();

        if (!applicantName || !email || !resumeLink) {
            setMessage("Please fill all application details.");
            return;
        }

        try {
            await API.post(`/user/applyjob/${user.role}`, {
                applicantName,
                email,
                resumeLink,
                status: "Applied",
                jobId: id
            });

            setMessage("Applied successfully.");
            navigate("/jobs");

        } catch (error) {
            console.log(error);
            setMessage("Unable to submit application.");
        }
    };

    return (
        <div>
            <div className="page-header">
                <h1>Apply Job</h1>
                <p>{job ? `${job.title} at ${job.company}` : `Job ID: ${id}`}</p>
            </div>

            <form className="form-panel" onSubmit={apply}>
                <div className="form-grid">
                    <label>
                        Applicant Name
                        <input
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label>
                        Resume Link
                        <input
                            value={resumeLink}
                            onChange={(e) => setResumeLink(e.target.value)}
                        />
                    </label>
                </div>

                {message && <p className="status-message">{message}</p>}

                <button className="primary-button" type="submit">
                    Apply
                </button>
            </form>
        </div>
    );
}

export default ApplyJob;