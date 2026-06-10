import { Link } from "react-router-dom";
import "../App.css";

function Home() {
    return (
        <div className="home-page">
            <nav className="home-nav">
                <div className="home-logo">Job Portal</div>
                <div className="home-links">
                    <Link to="/signin">Signin</Link>
                    <Link to="/signup" className="home-signup-link">Signup</Link>
                </div>
            </nav>

            <main className="home-content">
                <section className="home-hero">
                    <h1>Smart Hiring Starts Here</h1>
                    <p>
                        Our Job Portal connects jobseekers, recruiters, and admins in one simple
                        platform. Recruiters can post jobs and review applications, jobseekers can
                        apply easily, and admins can manage recruiters and job listings.
                    </p>

                    
                </section>

                <section className="home-features">
                    <div>
                        <h3>For Jobseekers</h3>
                        <p>Browse available jobs, apply quickly, and track application results.</p>
                    </div>
                    <div>
                        <h3>For Recruiters</h3>
                        <p>Add jobs, view user applications, and accept or decline candidates.</p>
                    </div>
                    <div>
                        <h3>For Admins</h3>
                        <p>Create recruiters, manage jobs, and keep the hiring process organized.</p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;
