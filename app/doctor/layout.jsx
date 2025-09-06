"use client"

import { useEffect } from 'react'
import styles from '../../styles/dashboard/dashboardLayout.module.css'
import { useDispatch, useSelector } from 'react-redux'

import { Loader } from '../../components/loader/Loader'
import { doctorapi } from '../utils/apis/doctorapi'
import ProtectedRoute from '../../components/productedRoute/ProtectedRoute'





export default function layout({ children }) {



    const { doctors, loading, error, nurture, onboarded_Patients } = useSelector((state) => state.doctor);

    const { user } = useSelector(state => state.auth || {})
    const doctorName = user?.data?.data?.[0]?.Name || "";
    const dispatch = useDispatch()
    useEffect(() => {
        if (doctorName) {
            dispatch(doctorapi(doctorName));
        }
    }, [dispatch, doctorName]);


    if (loading) return <Loader />
    if (error) return <p>Error While Fetching APi: {error}</p>;
    console.log(user)

    return (
        <>

            <ProtectedRoute allowedRoles={["doctor", "super admin"]}>

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