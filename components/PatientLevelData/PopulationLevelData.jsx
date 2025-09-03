import styles from '@/styles/patientleveldata/PopulationLevelData.module.css'

export const PopulationLevelData = () => {

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
            <div className={styles.container}>
                {
                    data.map((data) => (
                        <>
                            <div className={styles.content_container} key={data.id}>
                                <h4>{data.value}</h4>
                                <p>{data.title}</p>

                            </div>
                        </>
                    ))
                }
            </div>
        </>
    )
}