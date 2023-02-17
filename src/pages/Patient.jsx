import React from 'react'
import { SidebarPatient } from "../components";

import { useState } from "react";

// function PendingConsentRequest() {
//   const [isOpen, setIsOpen] = useState(false);

//   function toggleCollapsible() {
//     setIsOpen(!isOpen);
//   }

//   return (
//     <div>
//       <button
//         className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
//         onClick={toggleCollapsible}
//       >
//         Click Me
//       </button>
//       <div
//         className={`bg-gray-100 p-4 ${isOpen ? "" : "hidden"}`}
//       >
//         <p className="text-gray-800">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           Suspendisse varius enim in eros elementum tristique. Duis cursus,
//           mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
//           libero vitae erat.
//         </p>
//       </div>
//     </div>
//   );



// function PendingConsentRequest() {


//   return (
//     <div>
//       <h1>Clickable Division Example</h1>
//       <FunctionComponent onClickFunction={handleClick} />
//     </div>
//   );
// }

// export default PendingConsentRequest;




function Patient() {

  function PendingConsentRequest() {
    console.log('You clicked the division!');
    // add any function logic here
  }
  return (
    <div className="flex items-center justify-start">
      <SidebarPatient/>
      <div className="w-[85%] h-[100vh]">hi</div>
    </div>
  );
}

export default Patient;