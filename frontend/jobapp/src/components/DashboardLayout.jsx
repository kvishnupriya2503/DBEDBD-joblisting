import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import "../App.css";

function DashboardLayout() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    const role = Number(user.role);
    const dashboardPath = role === 1 ? "/admin" : role === 2 ? "/manager" : "/user";
    const roleName = role === 1 ? "Admin" : role === 2 ? "Recruiter" : "Jobseeker";

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/signin");
    };

    return (
        <div>
            <div className="navbar">
                <div className="logo">Job Portal</div>
                <div className="nav-actions">
                    <div className="user-info">Welcome, {user.fullname}</div>
                    <button className="logout-button" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="main-layout">
                <div className="sidebar">
                    <div className="profile-section">
                        <div className="profile-circle">
                            {user.fullname.charAt(0)}
                        </div>

                        <h2>{user.fullname}</h2>
                        <p>{user.email}</p>
                        <p>{roleName}</p>
                    </div>

                    <div className="sidebar-menu">
                        <Link to={dashboardPath}>
                            <button>Dashboard</button>
                        </Link>

                        {(role === 1 || role === 2) && (
                            <Link to="/addjob">
                                <button>Add Job</button>
                            </Link>
                        )}

                        <Link to="/jobs">
                            <button>{role === 1 ? "Manage Jobs" : role === 3 ? "Apply Jobs" : "All Jobs"}</button>
                        </Link>

                        {role === 1 && (
                            <Link to="/addrecruiter">
                                <button>Add Recruiter</button>
                            </Link>
                        )}

                        {(role === 1 || role === 2) && (
                            <Link to="/applications">
                                <button>Applications</button>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
