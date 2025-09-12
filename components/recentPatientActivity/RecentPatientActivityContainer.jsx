

"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/dashboard/RecentPatientActivity/RecentPatientActivityContainer.module.css";
import { PatientActivityCard } from '../../components/recentPatientActivity/PatientActivityCard';
import Image from "next/image";
import { useRouter } from "next/navigation";
import PatientInformationPopup from "../patientInformationPopup/PatientInformationPopup";
import AssesmentReport from "../assesmentReport/AssesmentReport";
import { useDispatch, useSelector } from "react-redux";

import { Loader } from "../loader/Loader";

import { Loader1 } from "../loader/Loader1";
import { doctorapi } from "../../app/utils/apis/doctorapi";
import { patientcompletedataapi } from "../../app/utils/apis/patientcompletedataapi";

export const RecentPatientActivityContainer = ({ title, patientsDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);

  const pageSize = 30;
  const totalPages = Math.ceil(patientsDetails.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = patientsDetails.slice(startIndex, startIndex + pageSize);

  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.doctor);
  const { data: patientCompleteData, loading: patientLoading, error: patientError } = useSelector((state) => state.patient);
  const { user } = useSelector((state) => state.auth);
  if (loading) return <p>Loading...</p>;

  const savedDoctor = localStorage.getItem("selectedDoctor");
  const handleNavigate = () => router.push("/doctor/dashboard");
  const handleRefresh = () => dispatch(doctorapi(user.data.data[0].role === "Doctor" ? user.data.data[0].Name : savedDoctor));
  


  const handleShowPopup = (patient) => {
    dispatch(patientcompletedataapi({ id: patient.id, moduleName: patient.moduleName }))
      .unwrap()
      .then((data) => {
        setSelectedPatient({ ...patient, details: data });
        setShowInfoPopup(true);
      })
      .catch((err) => console.error("Failed to fetch details:", err));
  };


  // ⬇️ Download icon → Report popup
  const handleDownloadReport = (patient) => {
    dispatch(patientcompletedataapi({ id: patient.id, moduleName: patient.moduleName }))

      .unwrap()
      .then((data) => {
        setSelectedPatient({ ...patient, details: data });
        setShowReportPopup(true);
      })
      .catch((err) => console.error("Failed to fetch report:", err));
  };

  const handleClosePopup = () => {
    setShowInfoPopup(false);
    setSelectedPatient(null);
  };

  const handleCloseReport = () => {
    setShowReportPopup(false);
    setSelectedPatient(null);
  };

  if (patientLoading) {
    return <Loader1 />
  }

  return (
    <>
      {/* Error UI */}
      {patientError && (
        <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          ❌ Failed to load patient details:{" "}
          {typeof patientError === "string"
            ? patientError
            : JSON.stringify(patientError)}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '15px' }}>
          <Image src='/images/Left-arrow.svg' style={{ cursor: "pointer" }} height={27} width={27} alt="navigate" onClick={handleNavigate} />
          <h3 className="head-txt">{title}</h3>
        </div>
        <div>
          <button className={styles.refresh_bnt} onClick={handleRefresh}>Refresh</button>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.titles}>
          <div><p>PATIENT</p></div>
          <div><p>STATUS</p></div>
          <div><p>PHONE ON</p></div>
          <div><p>DATE</p></div>
          <div><p>ACTIONS</p></div>
        </div>

        {currentData.map((card) => (
          <PatientActivityCard
            key={card.id}
            {...card}

            onShowPopup={() => handleShowPopup(card)}
            onDownloadReport={() => handleDownloadReport(card)} // 👈 new handler
          />
        ))}
      </div>

      {/* <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? styles.activePage : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}


        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div> */}
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className={styles.pageBtn}
        >
          Previous
        </button>

        {(() => {
          const pages = [];
          const maxVisible = 5;

          if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
          } else {
            pages.push(1);

            if (currentPage > 3) pages.push("...");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
          }

          return pages.map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className={styles.ellipsis}>...</span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`${styles.pageBtn} ${currentPage === p ? styles.activePage : ""}`}
              >
                {p}
              </button>
            )
          );
        })()}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className={styles.pageBtn}
        >
          Next
        </button>
      </div>



      {/* Patient Info Popup */}
      {/* {showInfoPopup && selectedPatient && (
        <PatientInformationPopup
          selectedPatient={selectedPatient}
          details={selectedPatient.details}
          onClose={handleClosePopup}
        />
      )} */}

      {showInfoPopup && selectedPatient && (
        <PatientInformationPopup
          selectedPatient={selectedPatient}
          details={selectedPatient.details}
          onClose={handleClosePopup}
          onViewReport={() => {

            setShowInfoPopup(false);   // close info popup
            setShowReportPopup(true);  // open report popup
          }}
        />
      )}



      {/* Assessment Report Popup */}
      {showReportPopup && selectedPatient && (
        <AssesmentReport
          {...selectedPatient}
          onClose={handleCloseReport}
          allData={selectedPatient.details.data[0]}
        />
      )}
    </>
  );
};
