import { useEffect, useState } from "react";
import API from "../services/api";

function Applications() {
    const [applications, setApplications] = useState([]);
    const [message, setMessage] = useState("");

    const user = JSON.parse(localStorage.getItem("user")) || {};
    const role = Number(user.role);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const res = await API.get(`/user/allapplications/${role}`);

            // SAFE handling (depends on backend response)
            const data = res.data?.data || res.data || [];

            setApplications(data);

        } catch (error) {
            console.log(error);
            setMessage("Unable to load applications.");
        }
    };

    const updateStatus = (id, status) => {
        setApplications((prev) =>
            prev.map((app) =>
                app.id === id ? { ...app, status } : app
            )
        );
    };

    return (
        <div>
            <div className="page-header">
                <h1>Applications</h1>
                <p>Review job applications.</p>
            </div>

            {message && <p className="status-message">{message}</p>}

            <div className="table-panel">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            {role === 2 && <th>Action</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {applications.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="empty-cell">
                                    No applications found
                                </td>
                            </tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app.id}>
                                    <td>{app.id}</td>
                                    <td>{app.applicantName}</td>
                                    <td>{app.email}</td>
                                    <td>{app.status}</td>

                                    {role === 2 && (
                                        <td>
                                            <button
                                                className="small-button success-button"
                                                onClick={() => updateStatus(app.id, "Accepted")}
                                            >
                                                Accept
                                            </button>

                                            <button
                                                className="danger-button"
                                                onClick={() => updateStatus(app.id, "Declined")}
                                            >
                                                Decline
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Applications;