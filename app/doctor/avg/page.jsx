// 'use client'


// import { useRouter } from "next/navigation"
// import styles from '../../../styles/dashboard/avg/avg.module.css'
// import { PopulationLevelData } from "../../../components/PatientLevelData/PopulationLevelData"
// import { useDispatch, useSelector } from "react-redux"
// import { useEffect } from "react"
// import { fetchavgmetrics } from "../../../app/store/slices/avgmatrics"
// import { Loader } from "../../../components/loader/Loader"


// export default function page() {
//     const route = useRouter()

//     const handlegoBack = () => {
//         route.push('/doctor/dashboard')
//     }

//     const dispatch = useDispatch()

//     const { avgmetrics, loading, error } = useSelector((state) => state.avgmatrics);

//     if (loading) {
//         return (
//             <>
//                 <Loader />
//             </>
//         )
//     }
//     useEffect(() => {
//         dispatch(fetchavgmetrics())
//     }, [dispatch])
//     const data = [
//         {
//             id: 1,
//             title: "Patients Continued",
//             value: "120"
//         },
//         {
//             id: 1,
//             title: "Patients Continued",
//             value: "120"
//         },
//         {
//             id: 1,
//             title: "Patients Continued",
//             value: "120"
//         },
//         {
//             id: 1,
//             title: "Patients Continued",
//             value: "120"
//         },
//         {
//             id: 1,
//             title: "Patients Continued",
//             value: "120"
//         },
//         {
//             id: 1,
//             title: "Patients Continued",
//             value: "120"
//         }
//         , {
//             id: 1,
//             title: "Patients Continued",
//             value: "120"
//         }

//     ]
//     console.log(avgmetrics, "from avg histerort")
//     return (
//         <>
//             <div className={styles.conatiner}>
//                 <div>
//                     <button className={styles.back_btn} onClick={() => handlegoBack()} >Go Back</button>
//                 </div>
//                 <div>
//                     <h1>Average Metrics</h1>
//                 </div>
//                 <div className={styles.container_inner}>
//                     <PopulationLevelData title="Population Level Data" data={avgmetrics} />
//                 </div>
//                 <div className={styles.container_inner}>
//                     <PopulationLevelData title="HCP Dashboard - Average Metrics" data={data} />
//                 </div>
//             </div>
//         </>
//     )
// }


'use client'

import { useRouter } from "next/navigation"
import styles from '../../../styles/dashboard/avg/avg.module.css'
import { PopulationLevelData } from "../../../components/PatientLevelData/PopulationLevelData"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchavgmetrics } from "../../../app/store/slices/avgmatrics"
import { Loader } from "../../../components/loader/Loader"

export default function Page() {
    const router = useRouter()
    const dispatch = useDispatch()

    const { avgmetrics, loading, error } = useSelector((state) => state.avgmatrics)

    useEffect(() => {
        dispatch(fetchavgmetrics())
    }, [dispatch])

    const handleGoBack = () => {
        router.push('/doctor/dashboard')
    }

    if (loading) return <Loader />

    if (!avgmetrics?.data) {
        return <p>Error loading data.</p>
    }

    const { levelData, hcpData } = avgmetrics.data

    const formatData = (dataObj) => {
        return Object.entries(dataObj).map(([key, value], index) => ({
            id: index + 1,
            title: formatKey(key),
            value: value
        }))
    }

const formatKey = (key) => {
    return key
        .replace(/([a-z])([A-Z])/g, '$1 $2')  // Handle camelCase: aveRageWeight → ave Rage Weight
        .replace(/_/g, ' ')                  // Handle snake_case
        .replace(/\s+/g, ' ')                // Remove extra spaces
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(' ')
}


    const levelFormatted = formatData(levelData)
    const hcpFormatted = formatData(hcpData)

    return (
        <div className={styles.conatiner}>
            <div>
                <button className={styles.back_btn} onClick={handleGoBack}>Go Back</button>
            </div>
            <div>
                <h1>Average Metrics</h1>
            </div>
            <div className={styles.container_inner}>
                <PopulationLevelData title="Population Level Data" data={levelFormatted} />
            </div>
            <div className={styles.container_inner}>
                <PopulationLevelData title="HCP Dashboard - Average Metrics" data={hcpFormatted} />
            </div>
        </div>
    )
}
