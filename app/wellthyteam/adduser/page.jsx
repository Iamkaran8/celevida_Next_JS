'use client'

import { useState, useEffect } from "react";
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
  const [buttonTxt, setButtonTxt] = useState("Create User");
  const [bulkMode, setBulkMode] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });
  const [bulkResults, setBulkResults] = useState({ success: [], errors: [] });

  // Update button text when switching modes
  useEffect(() => {
    if (!loading) {
      setButtonTxt(bulkMode ? "Upload CSV" : "Create User");
    }
  }, [bulkMode, loading]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMsg(""); // clear error when typing
  };

  // CSV Template Download
  const downloadCsvTemplate = () => {
    const csvContent = "Name,Email,password,role,city,area\nJohn Doe,john@example.com,password123,Doctor,Mumbai,Andheri\nJane Smith,jane@example.com,password456,Brand Team,Kolkata,Salt Lake";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "user_template.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle CSV file selection
  const handleCsvFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
    setErrorMsg("");
    setBulkResults({ success: [], errors: [] });
  };

  // Parse CSV content
  const parseCsv = (csvText) => {
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    const users = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length === headers.length) {
        const user = {};
        headers.forEach((header, index) => {
          user[header] = values[index];
        });
        users.push(user);
      }
    }
    return users;
  };

  // Handle bulk CSV upload
  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    
    if (!csvFile) {
      setErrorMsg("Please select a CSV file");
      return;
    }

    setLoading(true);
    setButtonTxt("Processing...");
    setBulkResults({ success: [], errors: [] });

    try {
      const csvText = await csvFile.text();
      const users = parseCsv(csvText);
      
      if (users.length === 0) {
        setErrorMsg("No valid users found in CSV file");
        setLoading(false);
        setButtonTxt("Upload CSV");
        return;
      }

      setBulkProgress({ current: 0, total: users.length });
      const results = { success: [], errors: [] };

      // Process users one by one to avoid overwhelming the API
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        setBulkProgress({ current: i + 1, total: users.length });

        try {
          // Validate required fields
          if (!user.Name || !user.password || !user.role) {
            results.errors.push({
              row: i + 2, // +2 because of header and 0-based index
              user: user.Name || user.Email || `Row ${i + 2}`,
              error: "Missing required fields (Name, password, role)"
            });
            continue;
          }

          await dispatch(createUserAccount(user)).unwrap();
          results.success.push({
            row: i + 2,
            user: user.Name,
            email: user.Email
          });
        } catch (err) {
          results.errors.push({
            row: i + 2,
            user: user.Name || user.Email || `Row ${i + 2}`,
            error: err?.message || "Failed to create user"
          });
        }
      }

      setBulkResults(results);
      
      if (results.success.length > 0) {
        setSuccessMsg(`✅ Successfully created ${results.success.length} users!`);
      }
      
      if (results.errors.length > 0) {
        setErrorMsg(`❌ ${results.errors.length} users failed to create. Check results below.`);
      }

      setCsvFile(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

    } catch (err) {
      setErrorMsg("Error processing CSV file: " + err.message);
    } finally {
      setLoading(false);
      setButtonTxt("Upload CSV");
      setBulkProgress({ current: 0, total: 0 });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent double submission
    if (loading) return;

    setLoading(true);
    setButtonTxt("Creating ...");

    if (!formData.Name || !formData.password || !formData.role) {
      setErrorMsg("⚠️ Name, Password, and Role are required.");
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
                <h3>{bulkMode ? 'Bulk Add Users' : 'Add New User'}</h3>
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

            {/* Mode Toggle */}
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <button
                type="button"
                onClick={() => {
                  setBulkMode(!bulkMode);
                  setErrorMsg("");
                  setSuccessMsg("");
                  setBulkResults({ success: [], errors: [] });
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: bulkMode ? "#007bff" : "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                {bulkMode ? "Switch to Single Mode" : "Switch to Bulk Mode"}
              </button>
            </div>

            {/* ✅ Success / Error Messages */}
            {successMsg && <p style={{ color: "green", marginBottom: "10px" }}>{successMsg}</p>}
            {errorMsg && <p style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</p>}

            {/* Bulk Mode Form */}
            {bulkMode ? (
              <div>
                {/* CSV Template Download */}
                <div style={{ marginBottom: "20px", textAlign: "center" }}>
                  <button
                    type="button"
                    onClick={downloadCsvTemplate}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "16px",
                      marginRight: "10px"
                    }}
                  >
                    📥 Download CSV Template
                  </button>
                  <small style={{ display: "block", marginTop: "5px", color: "#666" }}>
                    Download the template, fill in user details, and upload it back<br/>
                    <strong>Required fields:</strong> Name, password, role | <strong>Optional:</strong> Email, city, area
                  </small>
                </div>

                {/* CSV Upload Form */}
                <form onSubmit={handleBulkSubmit}>
                  <div className={styles.input_container}>
                    <div className={styles.input_box_container}>
                      <p>Upload CSV File</p>
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleCsvFileChange}
                        className={styles.phone_number_input}
                        style={{ fontSize: "16px", padding: "10px" }}
                      />
                      {csvFile && (
                        <small style={{ color: "#28a745", display: "block", marginTop: "5px" }}>
                          Selected: {csvFile.name}
                        </small>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {bulkProgress.total > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                      <p>Processing: {bulkProgress.current} / {bulkProgress.total}</p>
                      <div style={{
                        width: "100%",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "5px",
                        overflow: "hidden"
                      }}>
                        <div style={{
                          width: `${(bulkProgress.current / bulkProgress.total) * 100}%`,
                          backgroundColor: "#007bff",
                          height: "20px",
                          transition: "width 0.3s ease"
                        }}></div>
                      </div>
                    </div>
                  )}

                  <div className={styles.btn_container}>
                    <button
                      type="submit"
                      className={styles.sign_in_btn}
                      disabled={loading || !csvFile}
                      style={{ 
                        opacity: (loading || !csvFile) ? 0.6 : 1, 
                        cursor: (loading || !csvFile) ? "not-allowed" : "pointer" 
                      }}
                    >
                      {buttonTxt}
                    </button>
                  </div>
                </form>

                {/* Bulk Results */}
                {(bulkResults.success.length > 0 || bulkResults.errors.length > 0) && (
                  <div style={{ marginTop: "20px" }}>
                    <h4>Results:</h4>
                    
                    {bulkResults.success.length > 0 && (
                      <div style={{ marginBottom: "15px" }}>
                        <h5 style={{ color: "green" }}>✅ Successfully Created ({bulkResults.success.length}):</h5>
                        <div style={{ maxHeight: "150px", overflowY: "auto", border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
                          {bulkResults.success.map((item, index) => (
                            <div key={index} style={{ marginBottom: "5px", fontSize: "14px" }}>
                              Row {item.row}: {item.user} ({item.email})
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {bulkResults.errors.length > 0 && (
                      <div>
                        <h5 style={{ color: "red" }}>❌ Failed to Create ({bulkResults.errors.length}):</h5>
                        <div style={{ maxHeight: "150px", overflowY: "auto", border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
                          {bulkResults.errors.map((item, index) => (
                            <div key={index} style={{ marginBottom: "5px", fontSize: "14px" }}>
                              Row {item.row}: {item.user} - {item.error}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              // Single User Form
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
                  <p>Email ID <span style={{ color: "#666", fontSize: "14px" }}>(Optional)</span></p>
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
                  <p>City <span style={{ color: "#666", fontSize: "14px" }}>(Optional)</span></p>
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
                  <p>Area <span style={{ color: "#666", fontSize: "14px" }}>(Optional)</span></p>
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
            )}
            
            {/* ✅ Success / Error Messages (shown at bottom for single mode) */}
            {!bulkMode && (
              <>
                {successMsg && <p style={{ color: "green", marginBottom: "10px" }}>{successMsg}</p>}
                {errorMsg && <p style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
