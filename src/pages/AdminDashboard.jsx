import "../App.css";
import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <>
            <div className="page-header">
                <h1>Admin Dashboard</h1>
                <p>Manage recruiters, jobs, and user applications.</p>
            </div>

            <div className="dashboard-actions">
                <Link to="/addrecruiter" className="action-card">
                    <h3>Add Recruiter</h3>
                    <p>Create login access for a recruiter.</p>
                </Link>

                <Link to="/jobs" className="action-card">
                    <h3>Manage Jobs</h3>
                    <p>View jobs and delete unwanted posts.</p>
                </Link>

                <Link to="/applications" className="action-card">
                    <h3>Applications</h3>
                    <p>See all job applications submitted by users.</p>
                </Link>
            </div>
        </>
    );
}

export default AdminDashboard;
