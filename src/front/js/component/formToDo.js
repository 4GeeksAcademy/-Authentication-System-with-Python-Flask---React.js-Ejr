// import React, { useState } from "react";

// // export const FormToDo = (props) => {
//     const { handleAddItem } = props;
//     const [url, setUrl] = useState("");
//     const handleSubmit = e => {
//         e.preventDefault();
//         conbsole.log(url);

//         handleAddItem({
//             done: false,
//             id: (+new Date()).toString(),
//             url
//         });
//         setUrl("");
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="todo-list">
//                 <div className="file-input">
//                     <input
//                         type={"text"}
//                         onChange={(e) => setUrl(e.target.value)}
//                         value={url}
//                     />

//                     <button type="button" class="btn-light" style={{ color: "#458fff" }}
//                         disabled={description ? "" : "disabled"}
//                         onClick={() => {
//                             actions.agregar(url);
//                             setUrl("");


//                         }}
//                     >
//                         Ok
//                     </button>
//                 </div>
//             </div>
//         </form>
//     );
// };
