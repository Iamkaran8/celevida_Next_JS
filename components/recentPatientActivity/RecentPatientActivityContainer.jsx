// "use client";

// import { useEffect, useState } from "react";
// import styles from "@/styles/dashboard/RecentPatientActivity/RecentPatientActivityContainer.module.css";
// import { PatientActivityCard } from '@/components/recentPatientActivity/PatientActivityCard';
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import PatientInformationPopup from "../patientInformationPopup/PatientInformationPopup";
// import AssesmentReport from "../assesmentReport/AssesmentReport";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDoctorApi } from "@/app/utils/FetchDoctorApi";
// import { fetchPatientsCompleteDetails } from "@/app/utils/FechPatientsCompleteDetails";

// export const RecentPatientActivityContainer = ({ title, patientsDetails }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedPatient, setSelectedPatient] = useState(null); // selected patient
//   const [selectedReport, setSelectedReport] = useState(null);   // selected report popup
//   const pageSize = 30;
//   const totalPages = Math.ceil(patientsDetails.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const currentData = patientsDetails.slice(startIndex, startIndex + pageSize);

//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.doctor);


//   if (loading) return <p>Loading...</p>;
//   // if (error) return <p>Error While Fetching API: {error}</p>;
//   const { data: patientCompleteData, loading: patientLoading, error: patientError } = useSelector((state) => state.patient);

//   const handleNavigate = () => router.push("/doctor/dashboard");
//   const handleRefresh = () => dispatch(fetchDoctorApi());
//   const handleShowPopup = (patient) => setSelectedPatient(patient);
//   const handleClosePopup = () => setSelectedPatient(null);
//   const handleViewReport = (patient) => {
//     setSelectedPatient(null); // close info popup
//     dispatch(fetchPatientsCompleteDetails({ id: patient.id, moduleName: patient.moduleName }))
//       .unwrap()
//       .then((data) => {
//         setSelectedReport({ ...patient, details: data }); // open popup with data
//       })
//       .catch((err) => console.error("Failed to fetch details:", err));
//   };
//   useEffect(() => {
//     if (patientLoading) {
//       console.log("Fetching patient details...");
//     }
//     if (patientCompleteData) {
//       console.log("✅ Patient complete data:", patientCompleteData);
//     }
//     if (patientError) {
//       console.error("❌ Error fetching patient details:", patientError);
//     }
//   }, [patientLoading, patientCompleteData, patientError]);
//   const handleCloseReport = () => setSelectedReport(null);

//   return (
//     <>
//       <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
//         <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '15px' }}>
//           <Image src='/images/Left-arrow.svg' style={{ cursor: "pointer" }} height={27} width={27} alt="navigate" onClick={handleNavigate} />
//           <h3 className="head-txt">{title}</h3>
//         </div>
//         <div>
//           <button className={styles.refresh_bnt} onClick={handleRefresh}>Refresh</button>
//         </div>
//       </div>

//       <div className={styles.container}>
//         <div className={styles.titles}>
//           <div><p>PATIENT</p></div>
//           <div><p>STATUS</p></div>
//           <div><p>PHONE ON</p></div>
//           <div><p>DATE</p></div>
//           <div><p>ACTIONS</p></div>
//         </div>

//         {currentData.map((card) => (
//           <PatientActivityCard
//             key={card.id}
//             {...card}
//             onShowPopup={() => handleShowPopup(card)}
//           />
//         ))}
//       </div>

//       <div className={styles.pagination}>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(prev => prev - 1)}
//           className={styles.pageBtn}
//         >
//           Previous
//         </button>

//         {(() => {
//           const pages = [];
//           const maxVisible = 5;

//           if (totalPages <= maxVisible) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//           } else {
//             pages.push(1);

//             if (currentPage > 3) pages.push("...");

//             const start = Math.max(2, currentPage - 1);
//             const end = Math.min(totalPages - 1, currentPage + 1);

//             for (let i = start; i <= end; i++) pages.push(i);

//             if (currentPage < totalPages - 2) pages.push("...");
//             pages.push(totalPages);
//           }

//           return pages.map((p, i) =>
//             p === "..." ? (
//               <span key={`ellipsis-${i}`} className={styles.ellipsis}>...</span>
//             ) : (
//               <button
//                 key={p}
//                 onClick={() => setCurrentPage(p)}
//                 className={`${styles.pageBtn} ${currentPage === p ? styles.activePage : ""}`}
//               >
//                 {p}
//               </button>
//             )
//           );
//         })()}

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(prev => prev + 1)}
//           className={styles.pageBtn}
//         >
//           Next
//         </button>
//       </div>

//       {/* Patient Info Popup */}
//       {selectedPatient && (
//         <PatientInformationPopup
//           id={selectedPatient.id}
//           moduleName={selectedPatient.moduleName}
//           name={selectedPatient.patient_name}
//           phone={selectedPatient.phone_number}
//           status={selectedPatient.status}
//           age={selectedPatient.age}
//           gender={selectedPatient.gender}
//           weight={selectedPatient.weight}
//           height={selectedPatient.height}
//           onClose={handleClosePopup}
//           onViewReport={() => handleViewReport(selectedPatient)}
//         />
//       )}

//       {/* Assessment Report Popup */}
//       {selectedReport && (
//         <AssesmentReport
//           name={selectedReport.patient_name}
//           age={selectedReport.age}
//           weight={selectedReport.weight}
//           height={selectedReport.height}
//           gender={selectedReport.gender}
//           phone={selectedReport.phone_number}
//           status={selectedReport.status}
//           onClose={handleCloseReport}
//           allData={patientCompleteData.data[0]}
//         />
//       )}
//     </>
//   );
// };










// "use client";

// import { useEffect, useState } from "react";
// import styles from "@/styles/dashboard/RecentPatientActivity/RecentPatientActivityContainer.module.css";
// import { PatientActivityCard } from '@/components/recentPatientActivity/PatientActivityCard';
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import PatientInformationPopup from "../patientInformationPopup/PatientInformationPopup";
// import AssesmentReport from "../assesmentReport/AssesmentReport";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDoctorApi } from "@/app/utils/FetchDoctorApi";
// import { fetchPatientsCompleteDetails } from "@/app/utils/FechPatientsCompleteDetails";

// export const RecentPatientActivityContainer = ({ title, patientsDetails }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedPatient, setSelectedPatient] = useState(null); // full patient data
//   const [showInfoPopup, setShowInfoPopup] = useState(false);
//   const [showReportPopup, setShowReportPopup] = useState(false);

//   const pageSize = 30;
//   const totalPages = Math.ceil(patientsDetails.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const currentData = patientsDetails.slice(startIndex, startIndex + pageSize);

//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.doctor);
//   const { data: patientCompleteData, loading: patientLoading, error: patientError } = useSelector((state) => state.patient);

//   if (loading) return <p>Loading...</p>;

//   const handleNavigate = () => router.push("/doctor/dashboard");
//   const handleRefresh = () => dispatch(fetchDoctorApi());

//   //  when clicking eye button
//   const handleShowPopup = (patient) => {
//     dispatch(fetchPatientsCompleteDetails({ id: patient.id, moduleName: patient.moduleName }))
//       .unwrap()
//       .then((data) => {
//         setSelectedPatient({ ...patient, details: data }); // store full data
//         setShowInfoPopup(true); // open info popup
//       })
//       .catch((err) => console.error("Failed to fetch details:", err));
//   };

//   const handleClosePopup = () => {
//     setShowInfoPopup(false);
//     setSelectedPatient(null);
//   };

//   const handleViewReport = () => {
//     setShowInfoPopup(false);
//     setShowReportPopup(true);
//   };

//   const handleCloseReport = () => {
//     setShowReportPopup(false);
//     setSelectedPatient(null);
//   };

//   useEffect(() => {

//   }, [patientLoading, patientCompleteData, patientError]);

//   return (
//     <>
//       <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
//         <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '15px' }}>
//           <Image src='/images/Left-arrow.svg' style={{ cursor: "pointer" }} height={27} width={27} alt="navigate" onClick={handleNavigate} />
//           <h3 className="head-txt">{title}</h3>
//         </div>
//         <div>
//           <button className={styles.refresh_bnt} onClick={handleRefresh}>Refresh</button>
//         </div>
//       </div>

//       <div className={styles.container}>
//         <div className={styles.titles}>
//           <div><p>PATIENT</p></div>
//           <div><p>STATUS</p></div>
//           <div><p>PHONE ON</p></div>
//           <div><p>DATE</p></div>
//           <div><p>ACTIONS</p></div>
//         </div>

//         {currentData.map((card) => (
//           <PatientActivityCard
//             key={card.id}
//             {...card}
//             onShowPopup={() => handleShowPopup(card)}
//           />
//         ))}
//       </div>

//       <div className={styles.pagination}>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(prev => prev - 1)}
//           className={styles.pageBtn}
//         >
//           Previous
//         </button>

//         {(() => {
//           const pages = [];
//           const maxVisible = 5;

//           if (totalPages <= maxVisible) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//           } else {
//             pages.push(1);

//             if (currentPage > 3) pages.push("...");

//             const start = Math.max(2, currentPage - 1);
//             const end = Math.min(totalPages - 1, currentPage + 1);

//             for (let i = start; i <= end; i++) pages.push(i);

//             if (currentPage < totalPages - 2) pages.push("...");
//             pages.push(totalPages);
//           }

//           return pages.map((p, i) =>
//             p === "..." ? (
//               <span key={`ellipsis-${i}`} className={styles.ellipsis}>...</span>
//             ) : (
//               <button
//                 key={p}
//                 onClick={() => setCurrentPage(p)}
//                 className={`${styles.pageBtn} ${currentPage === p ? styles.activePage : ""}`}
//               >
//                 {p}
//               </button>
//             )
//           );
//         })()}

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(prev => prev + 1)}
//           className={styles.pageBtn}
//         >
//           Next
//         </button>
//       </div>

//       {/* Patient Info Popup */}
//       {showInfoPopup && selectedPatient && (
//         <PatientInformationPopup
//           id={selectedPatient.id}
//           moduleName={selectedPatient.moduleName}
//           name={selectedPatient.patient_name}
//           phone={selectedPatient.phone_number}
//           status={selectedPatient.status}
//           age={selectedPatient.age}
//           gender={selectedPatient.gender}
//           weight={selectedPatient.weight}
//           height={selectedPatient.height}
//           details={selectedPatient.details} 
//           allData={patientCompleteData.data[0]}
//           onClose={handleClosePopup}
//           onViewReport={handleViewReport}
//         />
//       )}

//       {/* Assessment Report Popup */}
//       {showReportPopup && selectedPatient && (
//         <AssesmentReport
//           name={selectedPatient.patient_name}
//           age={selectedPatient.age}
//           weight={selectedPatient.weight}
//           height={selectedPatient.height}
//           gender={selectedPatient.gender}
//           phone={selectedPatient.phone_number}
//           status={selectedPatient.status}
//           onClose={handleCloseReport}
//           allData={selectedPatient.details.data[0]} // 👈 reuse same data
//         />
//       )}
//     </>
//   );
// };
















"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/dashboard/RecentPatientActivity/RecentPatientActivityContainer.module.css";
import { PatientActivityCard } from '@/components/recentPatientActivity/PatientActivityCard';
import Image from "next/image";
import { useRouter } from "next/navigation";
import PatientInformationPopup from "../patientInformationPopup/PatientInformationPopup";
import AssesmentReport from "../assesmentReport/AssesmentReport";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorApi } from "@/app/utils/FetchDoctorApi";
import { fetchPatientsCompleteDetails } from "@/app/utils/FechPatientsCompleteDetails";

export const RecentPatientActivityContainer = ({ title, patientsDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null); // full patient data
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

  if (loading) return <p>Loading...</p>;

  const handleNavigate = () => router.push("/doctor/dashboard");
  const handleRefresh = () => dispatch(fetchDoctorApi());

  const handleShowPopup = (patient) => {
    dispatch(fetchPatientsCompleteDetails({ id: patient.id, moduleName: patient.moduleName }))
      .unwrap()
      .then((data) => {
        setSelectedPatient({ ...patient, details: data }); // merge card + API
        setShowInfoPopup(true);
      })
      .catch((err) => console.error("Failed to fetch details:", err));
  };


  const handleClosePopup = () => {
    setShowInfoPopup(false);
    setSelectedPatient(null);
  };

  const handleViewReport = () => {
    setShowInfoPopup(false);
    setShowReportPopup(true);
  };

  const handleCloseReport = () => {
    setShowReportPopup(false);
    setSelectedPatient(null);
  };

  useEffect(() => {

  }, [patientLoading, patientCompleteData, patientError]);

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
          />
        ))}
      </div>

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

      {showInfoPopup && selectedPatient && (
        <PatientInformationPopup
          selectedPatient={selectedPatient}     // has id, name, status, etc. from card
          details={selectedPatient.details} // 👈 API response
          onClose={handleClosePopup}
          onViewReport={handleViewReport}
        />
      )}

      {/* Assessment Report Popup */}
 
      {showReportPopup && selectedPatient && (
        <AssesmentReport
          {...selectedPatient}
          onClose={handleCloseReport}
          allData={selectedPatient.details.data[0]} // 👈 safe
        />
      )}




    </>
  );
};
