'use client'


import { useRouter } from "next/navigation"
import styles from '../../../styles/dashboard/avg/avg.module.css'
import { PopulationLevelData } from "../../../components/PatientLevelData/PopulationLevelData"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"


export default function page() {
    const route = useRouter()

    const handlegoBack = () => {
        route.push('/doctor/dashboard')
    }

    const dispatch = useDispatch()

    const { avgmetrics, loading, error } = useSelector((state) => state.avgmatrics)
    useEffect(() => {

    }, [dispatch])
    const data = [
        {
            id: 1,
            title: "Patients Continued",
            value: "120"
        },
        {
            id: 1,
            title: "Patients Continued",
            value: "120"
        },
        {
            id: 1,
            title: "Patients Continued",
            value: "120"
        },
        {
            id: 1,
            title: "Patients Continued",
            value: "120"
        },
        {
            id: 1,
            title: "Patients Continued",
            value: "120"
        },
        {
            id: 1,
            title: "Patients Continued",
            value: "120"
        }
        , {
            id: 1,
            title: "Patients Continued",
            value: "120"
        }

    ]
    return (
        <>
            <div className={styles.conatiner}>
                <div>
                    <button className={styles.back_btn} onClick={() => handlegoBack()} >Go Back</button>
                </div>
                <div>
                    <h1>Average Metrics</h1>
                </div>
                <div className={styles.container_inner}>
                    <PopulationLevelData title="Population Level Data" data={data} />
                </div>
                <div className={styles.container_inner}>
                    <PopulationLevelData title="HCP Dashboard - Average Metrics" data={data} />
                </div>
            </div>
        </>
    )
}