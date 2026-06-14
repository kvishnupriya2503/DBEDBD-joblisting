import { useState } from "react";
import API from "../services/api";

function AddRecruiter() {
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const addRecruiter = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!fullname.trim() || !phone.trim() || !email.trim() || !password.trim()) {
            setMessage("Please fill all recruiter details.");
            return;
        }

        try {
            setIsSaving(true);

            await API.post("/user/signup", {
                fullname: fullname.trim(),
                phone: phone.trim(),
                email: email.trim(),
                password: password.trim(),
                role: 2 
            });

            setFullname("");
            setPhone("");
            setEmail("");
            setPassword("");
            setMessage("Recruiter added successfully.");
        } catch (error) {
            console.log(error);
            setMessage("Unable to add recruiter. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h1>Add Recruiter</h1>
                <p>Create recruiter access for managing jobs and reviewing applications.</p>
            </div>

            <form className="form-panel" onSubmit={addRecruiter}>
                <div className="form-grid">
                    <label>
                        Full Name
                        <input
                            placeholder="Enter full name"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </label>

                    <label>
                        Phone
                        <input
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>

                {message && <p className="status-message">{message}</p>}

                <button className="primary-button" type="submit" disabled={isSaving}>
                    {isSaving ? "Adding..." : "Add Recruiter"}
                </button>
            </form>
        </div>
    );
}

export default AddRecruiter;
