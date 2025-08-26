

"use client";

import { useState } from "react";
import styles from "@/styles/dashboard/RecentPatientActivity/RecentPatientActivityContainer.module.css";
import { PatientActivityCard } from '@/components/recentPatientActivity/PatientActivityCard' // ✅ FIXED
import Image from "next/image";
import { useRouter } from "next/navigation";

export const RecentPatientActivityContainer = ({ title, patientsDetails }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // rows per page

    const totalPages = Math.ceil(patientsDetails.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentData = patientsDetails.slice(startIndex, startIndex + pageSize);
    const router = useRouter();

    const handleNavigate = () => {
        router.push("/doctor/dashboard"); // 👈 target route
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: "start", alignItems: "center", gap:"20px" }}>
                <Image src='/images/Left-arrow.svg' style={{cursor:"pointer"}} height={27} width={27} alt="navigate" onClick={() => handleNavigate()} /><h3 className="head-txt"> {title}</h3>
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
                        patient_name={card.patient_name}
                        patient_id={card.patient_id}
                        status={card.status}
                        phone_number={card.phone_number}
                        date={card.date}
                        id={card.id}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className={styles.pagination}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? styles.activePage : ""}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </>
    );
};
