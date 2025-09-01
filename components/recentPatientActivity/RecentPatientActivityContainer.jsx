


// "use client";

// import { useState } from "react";
// import styles from "@/styles/dashboard/RecentPatientActivity/RecentPatientActivityContainer.module.css";
// import { PatientActivityCard } from '@/components/recentPatientActivity/PatientActivityCard';
// // import PatientInformationPopup from '@/components/popups/PatientInformationPopup'; // Adjust path as needed
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import PatientInformationPopup from "../patientInformationPopup/PatientInformationPopup";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDoctorApi } from "@/app/utils/FetchDoctorApi";

// export const RecentPatientActivityContainer = ({ title, patientsDetails }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedPatient, setSelectedPatient] = useState(null); // 👈 selected patient
//   const pageSize = 30;
//   const totalPages = Math.ceil(patientsDetails.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const currentData = patientsDetails.slice(startIndex, startIndex + pageSize);
//   const router = useRouter();

//   const handleNavigate = () => {
//     router.push("/doctor/dashboard");
//   };

//   const handleShowPopup = (patient) => {
//     setSelectedPatient(patient);
//   };

//   const handleClosePopup = () => {
//     setSelectedPatient(null);
//   };

//   const [showReport, setShowReport] = useState(false); // 👈 controls report popup


//   const renderPageNumbers = () => {
//     const pages = [];
//     const maxVisible = 5;

//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       pages.push(1);
//       if (currentPage > 3) pages.push("...");
//       const start = Math.max(2, currentPage - 1);
//       const end = Math.min(totalPages - 1, currentPage + 1);
//       for (let i = start; i <= end; i++) pages.push(i);
//       if (currentPage < totalPages - 2) pages.push("...");
//       pages.push(totalPages);
//     }

//     return pages.map((p, i) =>
//       p === "..." ? (
//         <span key={i} className={styles.ellipsis}>...</span>
//       ) : (
//         <button
//           key={i}
//           onClick={() => setCurrentPage(p)}
//           className={currentPage === p ? styles.activePage : ""}
//         >
//           {p}
//         </button>
//       )
//     );
//   };

//   const dispatch = useDispatch()

//   const handleRefresh = () => {
//     dispatch(fetchDoctorApi());
//   }

//   const { loading, error } = useSelector((state) => state.doctor);
//   if (loading) return <Loader />
//   // if (error) return <p>Error While Fetching APi: {error}</p>;

//   return (
//     <>
//       <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
//         <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '15px' }}>
//           <Image src='/images/Left-arrow.svg' style={{ cursor: "pointer" }} height={27} width={27} alt="navigate" onClick={handleNavigate} />
//           <h3 className="head-txt">{title}</h3>
//         </div>
//         <div>
//           <button className={styles.refresh_bnt} onClick={() => { handleRefresh() }}>Refresh</button>
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
//         {/* Previous */}
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//           className={styles.pageBtn}
//         >
//           Previous
//         </button>

//         {/* Page Numbers */}
//         {(() => {
//           const pages = [];
//           const maxVisible = 5;

//           if (totalPages <= maxVisible) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//           } else {
//             pages.push(1); // first page

//             if (currentPage > 3) pages.push("...");

//             const start = Math.max(2, currentPage - 1);
//             const end = Math.min(totalPages - 1, currentPage + 1);

//             for (let i = start; i <= end; i++) pages.push(i);

//             if (currentPage < totalPages - 2) pages.push("...");
//             pages.push(totalPages); // last page
//           }

//           return pages.map((p, i) =>
//             p === "..." ? (
//               <span key={i} className={styles.ellipsis}>
//                 ...
//               </span>
//             ) : (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(p)}
//                 className={`${styles.pageBtn} ${currentPage === p ? styles.activePage : ""}`}
//               >
//                 {p}
//               </button>
//             )
//           );
//         })()}

//         {/* Next */}
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           className={styles.pageBtn}
//         >
//           Next
//         </button>
//       </div>


//       {/* 👇 Conditionally render popup */}
//       {selectedPatient && (
//         <PatientInformationPopup
//           name={selectedPatient.patient_name}
//           phone={selectedPatient.phone_number}
//           status={selectedPatient.status}
//           age={selectedPatient.age}
//           gender={selectedPatient.gender}
//           weight={selectedPatient.weight}
//           height={selectedPatient.height}
//           onClose={handleClosePopup}
//         />
//       )}

//     </>
//   );
// };






"use client";

import { useState } from "react";
import styles from "@/styles/dashboard/RecentPatientActivity/RecentPatientActivityContainer.module.css";
import { PatientActivityCard } from '@/components/recentPatientActivity/PatientActivityCard';
import Image from "next/image";
import { useRouter } from "next/navigation";
import PatientInformationPopup from "../patientInformationPopup/PatientInformationPopup";
import AssesmentReport from "../assesmentReport/AssesmentReport"; // Add this import
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorApi } from "@/app/utils/FetchDoctorApi";

export const RecentPatientActivityContainer = ({ title, patientsDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null); // selected patient
  const [selectedReport, setSelectedReport] = useState(null);   // selected report popup
  const pageSize = 30;
  const totalPages = Math.ceil(patientsDetails.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = patientsDetails.slice(startIndex, startIndex + pageSize);

  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.doctor);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error While Fetching API: {error}</p>;

  const handleNavigate = () => router.push("/doctor/dashboard");
  const handleRefresh = () => dispatch(fetchDoctorApi());
  const handleShowPopup = (patient) => setSelectedPatient(patient);
  const handleClosePopup = () => setSelectedPatient(null);
  const handleViewReport = (patient) => {
    setSelectedReport(patient); // open report popup
    setSelectedPatient(null);   // close patient info popup
  };
  const handleCloseReport = () => setSelectedReport(null);

  return (
    <>
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
      {selectedPatient && (
        <PatientInformationPopup
          name={selectedPatient.patient_name}
          phone={selectedPatient.phone_number}
          status={selectedPatient.status}
          age={selectedPatient.age}
          gender={selectedPatient.gender}
          weight={selectedPatient.weight}
          height={selectedPatient.height}
          onClose={handleClosePopup}
          onViewReport={() => handleViewReport(selectedPatient)}
        />
      )}

      {/* Assessment Report Popup */}
      {selectedReport && (
        <AssesmentReport
          name={selectedReport.patient_name}
          age={selectedReport.age}
          weight={selectedReport.weight}
          height={selectedReport.height}
          gender={selectedReport.gender}
          phone={selectedReport.phone_number}
          status={selectedReport.status}
          onClose={handleCloseReport}
        />
      )}
    </>
  );
};


