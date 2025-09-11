// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// export const Feedback = () => {
//     const { Feedbacks } = useSelector((state) => state.superadmin);

//     useEffect(() => {
//         console.log(Feedbacks, "fsadcehckfa")
//     }, [])

//     return (
//         <div style={{ height: '400px', overflowY: 'auto', padding: '10px' }}>
//             <h3>Feedbacks</h3>

//             {Feedbacks && Feedbacks.length > 0 ? (
//                 Feedbacks.map((feedback, index) => (
//                     <p key={index} style={{ marginBottom: '8px' }}>{feedback}</p>
//                 ))
//             ) : (
//                 <p>No Feedbacks</p>
//             )}
//         </div>
//     );
// };

// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// export const Feedback = () => {
//     const { Feedbacks } = useSelector((state) => state.superadmin);

//     useEffect(() => {
//         console.log(Feedbacks, "fsadcehckfa");
//     }, [Feedbacks]);

//     return (
//         <div style={{ height: '400px', overflowY: 'auto', padding: '10px' }}>
//             <h3>Feedbacks</h3>

//             {Feedbacks && Feedbacks.length > 0 ? (
//                 Feedbacks.filter(item => item?.feedback) // ✅ only keep items with feedback
//                          .map((feedback, index) => (
//                     <p key={index} style={{ marginBottom: '8px' }}>
//                         {feedback.feedback}
//                     </p>
//                 ))
//             ) : (
//                 <p>No Feedbacks</p>
//             )}
//         </div>
//     );
// };



import { useEffect } from "react";
import { useSelector } from "react-redux";

export const Feedback = () => {
    const { Feedbacks } = useSelector((state) => state.superadmin);

    useEffect(() => {
        console.log(Feedbacks, "fsadcehckfa");
    }, [Feedbacks]);

    return (
        <div style={{ height: '400px', overflowY: 'auto', padding: '10px' }}>
            <h3>Feedbacks</h3>

            {Feedbacks && Feedbacks.length > 0 ? (
                Feedbacks
                    .filter(item => item?.Feedbacks)
                    .map((item, index) => (
                        <div key={index} style={{ display: 'flex', border: '1px solid #ccc', padding: '10px', borderRadius: '7px', flexDirection: 'column', gap: '0px', justifyContent: 'start', alignItems: 'start', boxShadow: '0px 0px 10px 0px  rgba(0, 0, 0, 0.13)' }}>
                            <h4 style={{ margin: '1px ', padding: '1px ' }}>Patient Name : {item.Last_Name} </h4>
                            <p key={index} style={{ margin: '1px ', padding: '1px ' }} >
                                {item.Feedbacks}
                            </p>
                        </div>
                    ))
            ) : (
                <p>No Feedbacks</p>
            )}
        </div>
    );
};
