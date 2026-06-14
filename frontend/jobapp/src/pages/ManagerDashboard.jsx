import "../App.css";
import { Link } from "react-router-dom";

function ManagerDashboard() {
    return (
        <>
            <div className="page-header">
                <h1>Recruiter Dashboard</h1>
                <p>Track jobs and review user applications.</p>
            </div>

            <div className="dashboard-actions">
                <Link to="/addjob" className="action-card">
                    <h3>Add Job</h3>
                    <p>Create jobs that jobseekers can apply for.</p>
                </Link>

                <Link to="/applications" className="action-card">
                    <h3>Review Applications</h3>
                    <p>Accept or decline applications submitted by users.</p>
                </Link>
            </div>
        </>
    );
}

export default ManagerDashboard;
