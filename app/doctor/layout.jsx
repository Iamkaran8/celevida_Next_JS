"use client"

import { useEffect } from 'react'
import styles from '../../styles/dashboard/dashboardLayout.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDoctorApi } from '../utils/FetchDoctorApi'
import { Loader } from '@/components/loader/Loader'





export default function layout({ children }) {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDoctorApi());
    }, []);


    const { doctors, loading, error, nurture, onboarded_Patients } = useSelector((state) => state.doctor);
    if (loading) return <Loader />
    if (error) return <p>Error While Fetching APi: {error}</p>;



    console.log("this is nurture", nurture)


    console.log("doctors data", doctors)
    console.log("onboarded patients", onboarded_Patients)

    return (
        <>
            <div className={styles.dashboardContainer}>
                <div className={styles.left_side}  >
                    {children}
                </div>
                <div>

                </div>
            </div>
            <div>

            </div>
        </>
    )
}