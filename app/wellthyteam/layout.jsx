"use client"

import { useEffect } from 'react'
import styles from '../../styles/dashboard/dashboardLayout.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDoctorApi } from '../utils/FetchDoctorApi'
import { Loader } from '@/components/loader/Loader'
import ProtectedRoute from '../../components/productedRoute/ProtectedRoute'





export default function layout({ children }) {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDoctorApi());
    }, []);


    const { doctors, loading, error, nurture, onboarded_Patients } = useSelector((state) => state.doctor);
    if (loading) return <Loader />
    // if (error) return <p>Error While Fetching APi: {error}</p>;


    return (
        <>
            <ProtectedRoute allowedRoles={["brand"]}>
                <div className={styles.dashboardContainer}>
                    <div className={styles.left_side}  >
                        {children}
                    </div>
                    <div>

                    </div>
                </div>
                <div>

                </div>
            </ProtectedRoute>
        </>
    )
}