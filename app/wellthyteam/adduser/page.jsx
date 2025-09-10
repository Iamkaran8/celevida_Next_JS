'use client'

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Header } from "../../../components/header/Header";
import styles from '../../../styles/login/Login.module.css';
import Image from "next/image";
import { createUserAccount, fetchAllUsersAccount } from "@/app/store/slices/usersSlice";

export default function Page() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    password: "",
    role: "",
    city: "",
    area: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonTxt, setButtonTxt] = useState("Create User")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMsg(""); // clear error when typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent double submission
    if (loading) return;

    setLoading(true);
    setButtonTxt("Creating ...");

    if (!formData.Name || !formData.Email || !formData.password || !formData.role) {
      setErrorMsg("⚠️ Name, Email, Password, and Role are required.");
      setButtonTxt("Create User");
      setLoading(false);
      return;
    }

    dispatch(createUserAccount(formData))
      .unwrap()
      .then(() => {
        setSuccessMsg("✅ User created successfully!");
        setErrorMsg("");
        setButtonTxt("Create User");
        setLoading(false);

        setFormData({
          Name: "",
          Email: "",
          password: "",
          role: "",
          city: "",
          area: "",
        });

        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch((err) => {
        setErrorMsg("❌ Error creating user: " + (err?.message || "Something went wrong"));
        setSuccessMsg("");
        setButtonTxt("Create User");
        setLoading(false);
      });
  };


  return (
    <>
      <Header />
      <div
        className={styles.container}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div className={styles.right_container}>
          <div className={styles.right_inner_container}>
            <div className={styles.header_container}>
              <div>
                <h3>Add New User</h3>
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

            {/* ✅ Success / Error Messages */}
            {successMsg && <p style={{ color: "green", marginBottom: "10px" }}>{successMsg}</p>}
            {errorMsg && <p style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</p>}

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className={styles.input_container}>
                <div className={styles.input_box_container}>
                  <p>Name</p>
                  <input
                    type="text"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    className={styles.phone_number_input}
                    style={{ fontSize: "20px" }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className={styles.input_container}>
                <div className={styles.input_box_container}>
                  <p>Email ID</p>
                  <input
                    type="text"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className={styles.phone_number_input}
                    style={{ fontSize: "20px" }}
                  />
                </div>
              </div>

              {/* Password */}
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
                </div>
              </div>

              {/* Role */}
              <div className={styles.input_container}>
                <div className={styles.input_box_container}>
                  <p>Role</p>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={styles.phone_number_input}
                    style={{ fontSize: "20px" }}
                  >
                    <option value="">-- Select Role --</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Brand Team">Brand Team</option>
                    <option value="Field Executive">Field Executive</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
              </div>

              {/* City */}
              <div className={styles.input_container}>
                <div className={styles.input_box_container}>
                  <p>City</p>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={styles.phone_number_input}
                    style={{ fontSize: "20px" }}
                  >
                    <option value="">-- Select City --</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
              </div>


              {/* Area */}
              <div className={styles.input_container}>
                <div className={styles.input_box_container}>
                  <p>Area</p>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="Enter Area"
                    className={styles.phone_number_input}
                    style={{ fontSize: "20px" }}
                  />
                </div>
              </div>

              <div className={styles.btn_container}>
                <button
                  type="submit"
                  className={styles.sign_in_btn}
                  disabled={loading}
                  style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                >
                  {buttonTxt}
                </button>
              </div>
            </form>
            {/* ✅ Success / Error Messages */}
            {successMsg && <p style={{ color: "green", marginBottom: "10px" }}>{successMsg}</p>}
            {errorMsg && <p style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
