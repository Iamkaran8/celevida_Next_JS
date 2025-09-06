export const Feedback = () => {

    const data = [
        {
            id: 1,
            feedback: "super program"
        },
        {
            id: 1,
            feedback: "super program"
        },
        {
            id: 1,
            feedback: "super program"
        },
        {
            id: 1,
            feedback: "super program"
        },
        {
            id: 1,
            feedback: "super program"
        },
    ]
    return (
        <>
            <div>
                <h3>Feedbacks</h3>
                <div>
                    {
                        data.map((data) => (
                            <>
                                <p key={data.id}>{data.feedback}</p>
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    )
}