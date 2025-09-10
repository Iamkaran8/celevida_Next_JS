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
                    .filter(item => item?.Feedbacks) // ✅ only items with non-null Feedbacks
                    .map((item, index) => (
                        <div style={{display:'flex',border:'1px solid #ccc',padding:'10px',borderRadius:'7px',display:'flex',gap:'20px',justifyContent:'start',alignItems:'center'}}>
                            <h4 style={{margin:'0px !important',padding:'0px !important'}}>Patient Name :{item.Last_Name} </h4>
                            <p key={index} >
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
