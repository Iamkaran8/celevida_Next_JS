

'use client'

import { useRouter, useSearchParams } from "next/navigation"
import styles from '../../../styles/dashboard/avg/avg.module.css'
import { PopulationLevelData } from "../../../components/PatientLevelData/PopulationLevelData"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchavgmetrics } from "../../../app/store/slices/avgmatrics"
import { Loader } from "../../../components/loader/Loader"

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useDispatch()

  const { avgmetrics, loading } = useSelector((state) => state.avgmatrics)
  const { user } = useSelector((state) => state.auth)

  const queryDoctor = searchParams.get("doctor")
  const loggedInDoctor = user?.data?.data[0]?.Name
  const doctorNameToUse = queryDoctor || loggedInDoctor

  useEffect(() => {
    if (doctorNameToUse) {
      dispatch(fetchavgmetrics(doctorNameToUse))
    }
  }, [dispatch, doctorNameToUse])

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

  // const formatKey = (key) => {
  //   return key
  //     .replace(/([a-z])([A-Z])/g, '$1 $2')
  //     .replace(/_/g, ' ')
  //     .replace(/\s+/g, ' ')
  //     .trim()
  //     .split(' ')
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //     .join(' ')
  // }
  const formatKey = (key) => {
    
    const replacements = {
      aveRage: "Average",
      hcpData: "HCP Data",
      patientContinued: "Patient Continued",
      BoneBone: "Bone", 
    };

    
    Object.keys(replacements).forEach(bad => {
      const regex = new RegExp(bad, "gi");
      key = key.replace(regex, replacements[bad]);
    });


    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")                 
      .replace(/\s+/g, " ")               
      .trim()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

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
