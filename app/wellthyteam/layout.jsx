"use client"

import { useEffect } from 'react'
import styles from '../../styles/dashboard/dashboardLayout.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../components/loader/Loader'
import ProtectedRoute from '../../components/productedRoute/ProtectedRoute'
import { doctorapi } from '../utils/apis/doctorapi'
import { fetchDoctorNames } from '../utils/apis/fetchdoctornames'
import { filterapi } from '../utils/apis/filterapi'
import { adminavgtabledata } from '../utils/apis/adminavgtabledata'
import { fetchExecutives } from '../utils/apis/fetchExecutives'





export default function layout({ children }) {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(doctorapi(""));
        dispatch(fetchDoctorNames())
        dispatch(fetchExecutives())
    }, []);


    const { completeFilteredData, avgTableData, onboardedPatients } = useSelector((state) => state.superadmin)

    useEffect(() => {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const formatter = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        });

        const startDate = formatter.format(startOfMonth);
        const endDate = formatter.format(today);

        const filters = {
            city: "",
            executive: "",
            status: "",
            dateRange: {
                startDate,
                endDate
            }
        };

        dispatch(filterapi(filters));
        dispatch(adminavgtabledata(filters));
    }, []);


    const { doctors, loading, error, nurture, onboarded_Patients } = useSelector((state) => state.doctor);
    if (loading) return <Loader />
    if (error) return <p>Error While Fetching APi: {error}</p>;


    return (
        <>
            <ProtectedRoute allowedRoles={["super admin"]}>
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