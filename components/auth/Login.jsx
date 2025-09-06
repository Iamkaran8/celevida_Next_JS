


"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginSuccess } from "../../app/store/slices/authSlice";
import styles from "../../styles/login/Login.module.css";
import Image from "next/image";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // ✅ Loader state

    const dispatch = useDispatch();
    const router = useRouter();

    const validate = () => {
        let newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (!formData.role) {
            newErrors.role = "Please select a role";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            setLoading(true); // ✅ Show loader

            // Simulate API/Redux login
            
                dispatch(loginSuccess({ email: formData.email, role: formData.role }));

                // ✅ Navigate based on role
                if (formData.role === "admin") {
                    router.push("/wellthyteam/dashboard");
                } else if (formData.role === "doctor") {
                    router.push("/doctor/dashboard");
                } else if (formData.role === "brand") {
                    router.push("/brandteam/dashboard");
                }
            
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.left_container}>
                <Image
                    src="/images/Signin-left-image.png"
                    alt="image"
                    height={338}
                    width={500}
                    priority
                />
            </div>

            <div className={styles.right_container}>
                <div className={styles.right_inner_container}>
                    <div className={styles.header_container}>
                        <div>
                            <p>Welcome to Celevida</p>
                            <h4>Sign in</h4>
                        </div>
                        <div>
                            <Image
                                src="/images/SugarCoach-DigiSlate-img.png"
                                alt="Logo"
                                width={107}
                                height={50}
                            />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.input_container}>
                            <div className={styles.input_box_container}>
                                <p>Email ID</p>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter Email"
                                    className={styles.phone_number_input}
                                    style={{ fontSize: "20px" }}
                                />
                                {errors.email && <span className={styles.error}>{errors.email}</span>}
                            </div>
                        </div>

                        <div className={styles.input_container}>
                            <div className={styles.input_box_container}>
                                <p>Password</p>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    className={styles.phone_number_input}
                                    style={{ fontSize: "20px" }}
                                />
                                {errors.password && <span className={styles.error}>{errors.password}</span>}
                            </div>
                        </div>

                        <div className={styles.input_container}>
                            <div className={styles.input_box_container}>
                                <p>Role</p>
                                <select name="role" value={formData.role} onChange={handleChange}>
                                    <option value="">-- Select Role --</option>
                                    <option value="doctor">Doctor</option>
                                    <option value="brand">Brand Team</option>
                                    <option value="admin">Super Admin</option>
                                </select>
                                {errors.role && <span className={styles.error}>{errors.role}</span>}
                            </div>
                        </div>

                        <div className={styles.btn_container}>
                            <button type="submit" className={styles.sign_in_btn} disabled={loading}>
                                {loading ? "Loading..." : "Sign In"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
