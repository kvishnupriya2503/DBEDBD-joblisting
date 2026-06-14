import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

function Signup() {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const signup = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!fullname.trim() || !phone.trim() || !email.trim() || !password.trim()) {
            setMessage("Please fill all signup details.");
            return;
        }

        try {
            setIsSaving(true);

            await API.post("/user/signup", {
                fullname: fullname.trim(),
                phone: phone.trim(),
                email: email.trim(),
                password: password.trim(),
                role: 3
            });

            setMessage("Signup successful. Please signin.");
            navigate("/signin");
        } catch (error) {
            console.log(error);
            setMessage("Unable to signup. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-circle auth-circle-left"></div>
            <div className="auth-circle auth-circle-right"></div>

            <form className="auth-card signup-card" onSubmit={signup}>
                <h1>Job Portal Signup</h1>

                <input
                    placeholder="Enter Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />

                <input
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {message && <p className="auth-message">{message}</p>}

                <button type="submit" disabled={isSaving}>
                    {isSaving ? "Creating..." : "Signup"}
                </button>

                <p className="auth-switch">
                    Already have an account? <Link to="/signin">Signin</Link>
                </p>
                <Link className="auth-back-link" to="/">Welcome Back</Link>
            </form>
        </div>
    );
}

export default Signup;
