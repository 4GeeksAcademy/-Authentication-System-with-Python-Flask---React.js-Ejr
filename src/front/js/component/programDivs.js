import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/programDivs.css";
import NoPrograms from "./noPrograms";
import Calendar from "../pages/calendar";

let dayArray = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
let date = new Date();
let currentDayIndex = date.getDay();
let currentDay = dayArray[currentDayIndex];
function ProgramDivs() {
  const { store, actions } = useContext(Context);
  const [days, setDays] = useState(currentDay);
  let capitalLetterDays =days[0].toUpperCase() + days.replace(days[0],"")
  return (
    <div>
      <ul className="nav nav-pills  nav-justified" role="tablist">
        {dayArray.map((day, i) => {
          let capitalLetterDay =day[0].toUpperCase() + day.replace(day[0],"")
          return (
            <>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    currentDay == day ? "active d-none d-md-block " : "d-none d-md-block"
                  } dayFont border  `}
                  data-bs-toggle="pill"
                  data-bs-target={`#pills-${day}`}
                  type="button"
                  role="tab"
                  aria-controls={`pills-${day}`}
                  aria-selected={currentDay == day ? "true" : "false"}
                  onClick={() => setDays(day)}
                >
                  {capitalLetterDay}
                </button>
              </li>
              {/* mobile viewing */}
           
                    </>
                  );
                })}

              </ul>
                  {dayArray.map((day, i) => {
                    
                    return (
                      <>
                         <div className="btn-group d-flex justify-content-start ms-4 mb-1 d-md-none">
                              <button 
                              type="button" 
                              className={`nav-link dropdown-toggle ${
                                currentDay == day ? "active " : "d-none d-md-block"
                              } dayFont border  `} 
                              data-bs-toggle="dropdown" 
                              aria-expanded="false"
                              style={{fontSize:"5vw"}}
                              >
                                {capitalLetterDays}
                              </button>
                              <ul class="dropdown-menu">
                                {dayArray.map((dropdownDay,i)=>{
                                  let capitalLetterDropwdownDay =dropdownDay[0].toUpperCase() + dropdownDay.replace(dropdownDay[0],"")
                                  return(
                                    <div key={i}>
                                    <li
                                    onClick={() => setDays(dropdownDay)}
                                    ><a class="dropdown-item" >{capitalLetterDropwdownDay}</a></li>        
                                    </div>
                                  );
                                })}
                              </ul>
                           </div>
                      </>);
                      }
                    )
                  }
              

      {store.programs.length > 0 ? <Calendar days={days} /> : <NoPrograms />}
    </div>
  );
}

export default ProgramDivs;