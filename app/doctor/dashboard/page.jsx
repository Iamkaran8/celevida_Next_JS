
"use client";

import { PatientStatusDetails } from "../../../components/patientStatus/PatientStatusDetails";
import styles from '../../../styles/dashboard/page.module.css'
import { UpcommingPatient } from "../../../components/upcommingPatient/UpcommingPatient";
import { PatientSegmentation } from "../../../components/patientSegmentation/PatientSegmentation";
import { RecentPatientActivityContainer } from "../../../components/recentPatientActivity/RecentPatientActivityContainer";
import { Header } from "../../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { fetchDoctorNames } from "@/app/utils/apis/fetchdoctornames";
import { doctorapi } from "../../../app/utils/apis/doctorapi";
import { fetchUpcomingDoctors } from "../../../app/store/slices/upcomingDoctorSlice";
import Head from "next/head";
import FilterBar from "../../../components/filter/FilterBar";
import { selectFilteredPatients } from "../../../app/store/slices/doctorSlice";



export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

  // const { onboarded_Patients, prescribed, nurture, doctorNames } = useSelector((state) => state.doctor);
  const filteredPatients = useSelector(selectFilteredPatients);
  const { prescribed, nurture, doctorNames } = useSelector((state) => state.doctor);

  const { user } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const formRef = useRef(null);

  // Fetch doctor names once
  useEffect(() => {
    dispatch(fetchDoctorNames());
  }, [dispatch]);

  // Handle click outside suggestion list
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDoctors = doctorNames.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    if (selectedDoctor) {
      // Fetch dashboard data for selected doctor
      dispatch(doctorapi(selectedDoctor));
      dispatch(fetchUpcomingDoctors(selectedDoctor));
      // Navigate to avg metrics page with doctor name as query param

      setShowSuggestions(false);
    }
  };

  const mappedPatients = [...filteredPatients]
    .sort((a, b) => new Date(b.Created_Time) - new Date(a.Created_Time))
    .map((p) => ({
      id: p.id,
      patient_name: p.Last_Name || "Unknown",
      patient_id: `ID:#${p.id}`,
      status: p.StatusPrespcription || "N/A",
      phone_number: p.Mobile || "N/A",
      age: p.Age || "N/A",
      gender: p.Gender || "N/A",
      weight: p.weight || "N/A",
      height: p.weight || "N/A",
      date: p.Created_Time ? new Date(p.Created_Time).toLocaleDateString("en-GB") : "N/A",
      moduleName: p.moduleName,
    }));

  const handleNavigate = () => {
    router.push(`/doctor/avg?doctor=${encodeURIComponent(selectedDoctor)}`);
  };

  return (
    <div>

      <Header title="Welcome" />
      <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
        <FilterBar />
      </div>

      {user?.data?.data[0]?.role === "Super Admin" && (
        <div className={styles.patient_select}>
          <h3>Select Doctor Name To See The Details</h3>
          <br />
          <form
            onSubmit={handleDoctorSubmit}
            className={styles.doctor_form}
            ref={formRef}
          >
            <input
              type="text"
              placeholder="Type doctor name..."
              value={search}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedDoctor(e.target.value);
                setShowSuggestions(true);
              }}
              className={styles.doctor_search}
              autoComplete="off"
            />

            {showSuggestions && search && filteredDoctors.length > 0 && (
              <ul className={styles.suggestions_list}>
                {filteredDoctors.map((name, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelectedDoctor(name);
                      setSearch(name);
                      setShowSuggestions(false);
                    }}
                    className={styles.suggestion_item}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}

            <button type="submit" className={styles.doctor_submit_btn}>
              Submit
            </button>
          </form>
        </div>
      )}

      <div className={styles.patient_container}>
        <PatientStatusDetails
          title="Onboarded Patients"
          logo="/images/onboardedpatients.svg"
          color="#1B2559"
          count={filteredPatients.length}
          navigate="doctor/onboarded"
        />

        <PatientStatusDetails
          title="Prescribed"
          logo="/images/Prescribed.svg"
          color="#23B883"
          count={filteredPatients.filter(p => p.StatusPrespcription === "Celevida_Onboarded").length}
          navigate="doctor/prescribed"
        />

        <PatientStatusDetails
          title="Nurture Patients"
          logo="/images/Nurture.svg"
          color="#4085F3"
          count={filteredPatients.filter(p => p.StatusPrespcription === "Celevida_Nurture").length}
          navigate="doctor/nurture"
        />

      </div>

      <div className={styles.second_section}>
        <div className={styles.second_section_left}>
          <PatientSegmentation />
        </div>
        <div className={styles.second_section_right}>
          <UpcommingPatient />
        </div>
      </div>

      <div className={styles.avg_btn}>
        <button onClick={handleNavigate} className={styles.avg_button}>
          View Average Metrics
        </button>
      </div>

      <RecentPatientActivityContainer
        title="Recent Patient Activity"
        patientsDetails={mappedPatients}
      />
    </div>
  );
}
