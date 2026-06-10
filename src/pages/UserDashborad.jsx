import "../App.css";
import { Link } from "react-router-dom";

function UserDashboard() {
    return (
        <>
            <div className="page-header">
                <h1>Jobseeker Dashboard</h1>
                <p>Find available jobs and apply quickly.</p>
            </div>

            <div className="dashboard-actions">
                <Link to="/jobs" className="action-card">
                    <h3>Apply Jobs</h3>
                    <p>Browse all open jobs and submit your application.</p>
                </Link>
            </div>
        </>
    );
}

export default UserDashboard;
