import { useSelector } from "react-redux";

export const Feedback = () => {
    const { Feedbacks } = useSelector((state) => state.superadmin);

    return (
        <div style={{ height: '400px', overflowY: 'auto',  padding: '10px' }}>
            <h3>Feedbacks</h3>

            {Feedbacks && Feedbacks.length > 0 ? (
                Feedbacks.map((feedback, index) => (
                    <p key={index} style={{ marginBottom: '8px' }}>{feedback}</p>
                ))
            ) : (
                <p>No Feedbacks</p>
            )}
        </div>
    );
};
