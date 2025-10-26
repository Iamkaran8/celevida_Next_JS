"use client"

import { useEffect } from 'react'
import styles from '../../styles/dashboard/dashboardLayout.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../components/loader/Loader'
import { doctorapi } from '../utils/apis/doctorapi'
import ProtectedRoute from '../../components/productedRoute/ProtectedRoute'
import { fetchDoctorNames } from '../utils/apis/fetchdoctornames'
import { fetchExecutives } from '../utils/apis/fetchExecutives'
import { fetchDoctors } from '../utils/apis/fetchDoctors'
import { filterapi } from '../utils/apis/filterapi'
import { adminavgtabledata } from '../utils/apis/adminavgtabledata'





export default function layout({ children }) {

    const { user } = useSelector(state => state.auth || {})
    const doctorName = user?.data?.data?.[0]?.Name || "";
    const dispatch = useDispatch()
    useEffect(() => {
        if (doctorName) {
            dispatch(doctorapi(""));
            dispatch(fetchDoctorNames())
            dispatch(fetchExecutives())
            dispatch(fetchDoctors())
        }
    }, [dispatch, doctorName]);

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
            cities: [],
            executives: [],
            doctors: [],
            statuses: [],
            dateRange: {
                startDate,
                endDate
            }
        };

        dispatch(filterapi(filters));
        dispatch(adminavgtabledata(filters));
    }, []);

    const { loading, error } = useSelector((state) => state.doctor);
    if (loading) return <Loader />
    if (error) return <p>Error While Fetching APi: {error}</p>;



    return (
        <>
            <ProtectedRoute allowedRoles={["brand team", "super admin"]}>
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