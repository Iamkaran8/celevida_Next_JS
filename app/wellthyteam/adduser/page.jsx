'use client'

import { useEffect, useState } from "react";
import { Header } from "../../../components/header/Header";
import styles from '../../../styles/login/Login.module.css'
import Image from "next/image";   // ✅ Import Next.js Image

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: add validation + dispatch loginUser here
    console.log("Submitting:", formData);
  };

  return (
    <>
      <Header />
      <div className={styles.container} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
        <div className={styles.right_container}>
          <div className={styles.right_inner_container}>
            <div className={styles.header_container}>
              <div>
                <h3>Add New users here</h3>
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
                </div>
              </div>

              <div className={styles.btn_container}>
                <button type="submit" className={styles.sign_in_btn}>
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
