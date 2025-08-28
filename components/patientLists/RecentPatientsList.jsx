"use client";
import { useState } from 'react';
import { PatientActivityCard } from '../recentPatientActivity/PatientActivityCard';


export default function RecentPatientsList() {

    const [isOpen, setIsOpen] = useState(false)



    return (
        <>
            <PatientActivityCard />
        </>
    );
}
