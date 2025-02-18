import { useState } from "react";
import "./form.css";

export default function Form() {
    const [formData, setFormData] = useState({
        fullName: "",
        userName: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
        if (formData.userName.length < 3) newErrors.userName = "Username must be at least 3 characters";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        return newErrors;
    };

    const handleInputChange = (event) => {
        setFormData((currData) => {
            return { ...currData, [event.target.name]: event.target.value };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            console.log("Form submitted:", formData);
            setFormData({
                fullName: "",
                userName: "",
                password: ""
            });
            setErrors({});
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="input-group">
                <label htmlFor="fullname">Full Name</label>
                <input
                    className="form-input"
                    placeholder="enter your Fullname"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    id="fullname"
                    name="fullName"
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <br /><br />
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                    className="form-input"
                    placeholder="enter your username"
                    type="text"
                    value={formData.userName}
                    onChange={handleInputChange}
                    id="username"
                    name="userName"
                />
                {errors.userName && <span className="error-message">{errors.userName}</span>}
            </div>

            <br /><br />
            <div className="input-group">
                <label htmlFor="password">password</label>
                <input
                    className="form-input"
                    placeholder="enter your password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    id="password"
                    name="password"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button className="submit-button">Submit</button>
        </form>
    );
}