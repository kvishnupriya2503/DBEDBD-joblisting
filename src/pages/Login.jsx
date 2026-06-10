import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const login = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await API.post("/user/signin", {
                email: email.trim(),
                password: password.trim()
            });

            // ✅ FIX: backend returns { message, token, user }
            const user = res.data.user;

            if (!user || !user.email) {
                setMessage("Invalid credentials.");
                return;
            }

            localStorage.setItem("user", JSON.stringify(user));

            if (user.role === 1) navigate("/admin");
            else if (user.role === 2) navigate("/manager");
            else navigate("/user");

        } catch (error) {
            console.log(error);
            setMessage("Invalid login.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-circle auth-circle-left"></div>
            <div className="auth-circle auth-circle-right"></div>

            <form className="auth-card" onSubmit={login}>
                <h1>Job Portal Login</h1>

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

                <button type="submit">Login</button>

                <p className="auth-switch">
                    Don't have an account? <Link to="/signup">Signup</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;