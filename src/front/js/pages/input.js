import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/input.css";
import { UpdateLink } from "../component/updateLink";

import {  faHouseCircleCheck } from "@fortawesome/free-solid-svg-icons";

let timeArray = [];

const createTimeArray = () => {
  let hour = 9;
  let hourLoop = 0;
  let dayOrNight = "AM";
  for (let i = 0; i < 23; i++) {
    if (hour == 12 && hourLoop == 0) {
      dayOrNight = "PM";
      timeArray.push(`${hour}:00 ${dayOrNight}`);
      hourLoop++;
    } else if (hour == 12 && hourLoop == 1) {
      timeArray.push(`${hour}:30 ${dayOrNight}`);
      hourLoop = 0;
      hour = 1;
    } else if (hourLoop == 0) {
      timeArray.push(`${hour}:00 ${dayOrNight}`);
      hourLoop++;
    } else if (hourLoop == 1) {
      timeArray.push(`${hour}:30 ${dayOrNight}`);
      hourLoop = 0;
      hour++;
    }
  }
};
createTimeArray();
let dayArray = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
function Input() {
  const { store, actions } = useContext(Context);

  const [programIndex, setProgramIndex] = useState(0);
  const [dropdownTitle, setDropdownTitle] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [updatedPrograms, setUpdatedPrograms] = useState([]);
  const [mobileDayIndex, setMobileDayIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [programName, setProgramName] = useState("");
  const [programDescription, setProgramDescription] = useState("");
  const [newProgram, setNewProgram] = useState(false);

  useEffect(() => {
    if (store.programs.length > 0) {
      setProgramName("New Program")
      setProgramDescription("description")
      setDropdownTitle(store.programs[0]);
      setUpdatedPrograms(store.programs);
    }
  }, [store.programs]);
  return (
    <div className="mx-4 input-container">
      <div className=" input-title row mb-4 mb-md-2 mb-lg-2">
        <div className="col">
          <h1 className="my-4  font-weight-bold display-5 ">Program Entry</h1>
        </div>
      </div>

      <div className=" input-content row border border-2 p-lg-3 p-md-3 p-2">
        <div className=" input-name-description-container col-md-4 col-lg-4 col-6">
          <div className="">
            {newProgram ? 
           ""
            : <div 
            className="dropdown "
            onClick={()=> actions.clearInputStatusMessage()}
            >
            <a
              className="btn dropdown-toggle mb-3"
              style={{
                border: "1.5px solid #ea6f36",
                boxShadow: "0px 1px 4.5px 0px #ea6f36",
              }}
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {newProgram ? "New Program" : dropdownTitle?.name}
            </a>

            <ul
              className="dropdown-menu overflow-auto"
              aria-labelledby="dropdownMenuLink"
            >
              {[...store?.programs,{name:"Create New Program"}].map((programTitle, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setRefresh(false);
                      if(programTitle.name == "Create New Program"){
                        setNewProgram(true);
                        setUpdatedPrograms((prevUpdatedPrograms) => {
                          const updatedProgramsList = [...prevUpdatedPrograms,
                            {
                              description: "",
                              friday_end: null,
                              friday_start: null,
                              monday_end: null,
                              monday_start: null,
                              name: "",
                              program_number: store.programs.length +1,
                              saturday_end: null,
                              saturday_start: null,
                              sunday_end: null,
                              sunday_start: null,
                              thursday_end: null,
                              thursday_start: null,
                              tuesday_end: null,
                              tuesday_start: null,
                              wednesday_end: null,
                              wednesday_start: null
                          }
                          ];
                          
                          setProgramIndex(
                            updatedProgramsList[index ].program_number - 1
                          );
                          setDropdownTitle(updatedProgramsList[index]);
                          
                          return updatedProgramsList;
                        });
                        
                      }
                      else{
                        setProgramIndex(
                          store.programs[index].program_number - 1
                        );
                        setDropdownTitle(store.programs[index]);
                      }
                    }
                  }
                  >
                    <a className="dropdown-item">{programTitle.name}</a>
                  </li>
                );
              })}
            </ul>
          </div>}
            
            <div className="inputDiv px-0 px-md-1 px-lg-1">
              <label className="mb-2" htmlFor="program-name ">
                Program Name
              </label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
     
                  setProgramName(value)
                  setUpdatedPrograms((prevUpdatedPrograms) => {
                    const updatedProgramsList = [...prevUpdatedPrograms];
                    updatedProgramsList[programIndex] = {
                      ...updatedProgramsList[programIndex],
                      name: value,
                    };
                    return updatedProgramsList;
                  });
                }}
                id="program-name"
                placeholder="type name of program here"
                className="form-control mb-2"
                value={
                   updatedPrograms[programIndex]?.name
                    
                }
              />
              <label className="mb-2" htmlFor="floatingTextarea">
                Program Description
              </label>
              <textarea
                className="form-control "
                placeholder="type brief description of your program"
                value={
                  updatedPrograms[programIndex]?.description
                }
                onChange={(e) => {
                  const value = e.target.value;
                  setProgramDescription(value);
                  setUpdatedPrograms((prevUpdatedPrograms) => {
                    const updatedProgramsList = [...prevUpdatedPrograms];
                    updatedProgramsList[programIndex] = {
                      ...updatedProgramsList[programIndex],
                      description: value,
                    };
                    return updatedProgramsList;
                  });
                }}
                id="floatingTextarea"
              ></textarea>
            </div>
          </div>
        </div>

        <div className=" input-start-end col-md-8 col-lg-8 col-6 pe-0">
          {/* mobile view start */}
         <div className=" input-mobile-container d-block d-md-none d-lg-none">
          {/* day carousel */}
                <div 
                  id="day-carousel" 
                  className=" w-75 m-auto carousel slide mb-4 mt-1  p-2"
                  style={{backgroundColor:"#00000057"}}
                >
                    <div class="carousel-inner">
                      {dayArray.map((day,i)=>{
                        return(
                          <div
                            className={`carousel-item ${day == dayArray[mobileDayIndex] ? "active" : ""} text-center`}
                            key={i}
                          >
                          { dayArray[mobileDayIndex]}
                          </div>

                        );
                      })}
                    
                    </div>
                    <button 
                        className="carousel-control-prev" 
                        type="button" 
                        data-bs-target="#day-carousel"
                        data-bs-slide="prev"
                        onClick={()=> {
                          if(mobileDayIndex == 0){
                            setMobileDayIndex(dayArray.length-1)
                          }
                          else{
                            setMobileDayIndex(mobileDayIndex -1 )
                          }
                      }} 
                    >
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button 
                        className="carousel-control-next" 
                        type="button" data-bs-target="#day-carousel" 
                        data-bs-slide="next"
                        onClick={()=> {
                          if(mobileDayIndex == dayArray.length-1){
                            setMobileDayIndex(0)
                          }
                          else{
                            setMobileDayIndex(mobileDayIndex + 1)
                          }
                        }}
                    >
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
            </div>
         </div>
          <div className=" input-mobile-start-end d-flex justify-content-start ">
            {dayArray.map((day, i) => {
              // list variables for conditions

              let dayStartTrue =  updatedPrograms[programIndex]?.[
                `${day.toLowerCase()}_start`
              ] &&
              updatedPrograms[programIndex]?.[
                `${day.toLowerCase()}_start`
              ] != null;
              
              let dayStartFalse =  !updatedPrograms[programIndex]?.[
                `${day.toLowerCase()}_start`
              ] &&
              updatedPrograms[programIndex]?.[
                `${day.toLowerCase()}_start`
              ] == null;
              return (
                
                <div
                  key={i}
                  className={` input-mobile-day-check border p-2 ${
                   day == dayArray[mobileDayIndex] ? "d-md-none d-lg-none d-block" : "d-none"
                  }`}
                  style={{ width: "100%" }}
                >
                  <div className=" input-mobile-day-schedule-title row">
                    <div className="">
                      <h6 className="me-3">{day} Schedule</h6>
                    </div>
                  </div>
                  <div className=" input-mobile-set-disable d-flex">
                    <div className="form-check form-switch ">
                      <input
                        onClick={() => {
                          // set start and end time to null
                          if (
                            dayStartTrue
                          ) {
                            setUpdatedPrograms((prevUpdatedPrograms) => {
                              const updatedProgramsList = [
                                ...prevUpdatedPrograms,
                              ];
                              updatedProgramsList[programIndex] = {
                                ...updatedProgramsList[programIndex],
                                [`${day.toLowerCase()}_start`]: null,
                                [`${day.toLowerCase()}_end`]: null,
                              };
                              return updatedProgramsList;
                            });
                          } else if (
                            // set start and end time to 9am/9:30am as default when first setting to active
                            dayStartFalse
                          ) {
                            setUpdatedPrograms((prevUpdatedPrograms) => {
                              const updatedProgramsList = [
                                ...prevUpdatedPrograms,
                              ]; 
                              updatedProgramsList[programIndex] = {
                                ...updatedProgramsList[programIndex],
                                [`${day.toLowerCase()}_start`]: "9:00 AM",
                                [`${day.toLowerCase()}_end`]: "9:30 AM",
                              };
                              return updatedProgramsList; // Return the updated array
                            });
                          }
                        }}
                        checked={
                          dayStartTrue
                            ? true
                            : false
                        }
                        className=" input-mobile-check form-check-input "
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        {/* set text on switch button to  "Disable" if currently active and vice versa */}
                        {dayStartTrue
                          ? "Disable"
                          : "Set Time"}
                      </label>
                    </div>
                  </div>
                  
                  <div
                    // set opacity to show disabled effect if set to not active
                    className={`row input-mobile-start-end-time ${
                      dayStartTrue
                        ? ""
                        : "pe-none opacity-25"
                    }`}
                  >
                    <div className="col">
                      <div className="btn-group m-1">
                        <h6 className="me-2">Start Time: </h6>
                        <button
                          type="button"
                          className=" btn btn-success dropdown-toggle p-1  "
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ fontSize: "14px" }}
                        >
                          {updatedPrograms[programIndex]?.[
                            `${day.toLowerCase()}_start`
                          ] == null
                            ? "N/A"
                            : updatedPrograms[programIndex]?.[
                                `${day.toLowerCase()}_start`
                              ]}
                        </button>
                        <ul className="dropdown-menu overflow-auto">
                          {timeArray.map((hour, timeLoopi) => {
                            return (
                              <>
                                <li
                                  key={timeLoopi}
                                  onClick={() => {
                                    // update start time
                                    setUpdatedPrograms(
                                      (prevUpdatedPrograms) => {
                                        const updatedProgramsList = [
                                          ...prevUpdatedPrograms,
                                        ];
                                        updatedProgramsList[programIndex] = {
                                          ...updatedProgramsList[programIndex],
                                          [`${day.toLowerCase()}_start`]: hour,
                                        };

                                        return updatedProgramsList;
                                      }
                                    );
                                    // update end time so when a user clicks on
                                    // a given hour for start time, the available end times in dropdown
                                    // are all after given start time
                                    if (
                                      timeArray[timeLoopi + 1] &&
                                      timeArray[timeLoopi + 1] != "undefined"
                                    ) {
                                      setUpdatedPrograms(
                                        (prevUpdatedPrograms) => {
                                          const updatedProgramsList = [
                                            ...prevUpdatedPrograms,
                                          ];
                                          updatedProgramsList[programIndex] = {
                                            ...updatedProgramsList[programIndex],
                                            [`${day.toLowerCase()}_end`]:
                                              timeArray[i + 1],
                                          };
                                          return updatedProgramsList;
                                        }
                                      );
                                    }
                                  }}
                                >
                                  <p className="">{hour}</p>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="btn-group m-1">
                        <h6 className="me-3">End Time: </h6>
                        <button
                          style={{ fontSize: "14px" }}
                          type="button"
                          className="btn btn-danger dropdown-toggle p-1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {updatedPrograms[programIndex]?.[
                            `${day.toLowerCase()}_start`
                          ] == null
                            ? "N/A"
                            : updatedPrograms[programIndex]?.[
                                `${day.toLowerCase()}_end`
                              ]}
                        </button>
                        <ul className="dropdown-menu overflow-auto">
                          {timeArray.map((hour, i) => {
                            return (
                              <>
                                <li
                                  key={i}
                                  onClick={() => {
                                    setUpdatedPrograms(
                                      (prevUpdatedPrograms) => {
                                        const updatedProgramsList = [
                                          ...prevUpdatedPrograms,
                                        ];
                                        updatedProgramsList[programIndex] = {
                                          ...updatedProgramsList[programIndex],
                                          [`${day.toLowerCase()}_end`]: hour,
                                        };
                                        return updatedProgramsList;
                                      }
                                    );
                                  }}
                                >
                                  <p className="">
                                    {/* ternary operator to display end times
                                     only  after selected start Time */}

                                    {updatedPrograms[programIndex]?.[
                                      `${day.toLowerCase()}_start`
                                    ] != undefined &&
                                    i >
                                      timeArray.indexOf(
                                        updatedPrograms[programIndex]?.[
                                          `${day.toLowerCase()}_start`
                                        ]
                                      )
                                      ? hour
                                      : ""}
                                  </p>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
           {/* mobile view end */}

          <div className=" input-content d-flex justify-content-center align-items-center">
            {dayArray.map((day, i) => {
              
              // set conditions variables

              let dayStartTrue =  updatedPrograms[programIndex]?.[
                `${day.toLowerCase()}_start`
              ] &&
              updatedPrograms[programIndex]?.[
                `${day.toLowerCase()}_start`
              ] != null;
              
              let dayStartFalse =  !updatedPrograms[programIndex]?.[
                `${day.toLowerCase()}_start`
              ] &&
              updatedPrograms[programIndex]?.[
                `${day.toLowerCase()}_start`
              ] == null;

              return (
                // i < 3 to set first 3 days of week on top row
                <div
                  key={i}
                  className={`dayCheck border p-2 ${
                    i < 3 ? "d-md-block d-lg-block d-none" : "d-none"
                  }`}
                  style={{ width: "30%" }}
                >
                  <div className="col d-flex">
                    <div className="form-check form-switch ">
                      <input
                        onClick={() => {
                          // set start and end time to null
                          if (
                            dayStartTrue
                          ) {
                            setUpdatedPrograms((prevUpdatedPrograms) => {
                              const updatedProgramsList = [
                                ...prevUpdatedPrograms,
                              ];
                              updatedProgramsList[programIndex] = {
                                ...updatedProgramsList[programIndex],
                                [`${day.toLowerCase()}_start`]: null,
                                [`${day.toLowerCase()}_end`]: null,
                              };
                              return updatedProgramsList;
                            });
                          } else if (
                            // set start and end time to 9am/9:30am as default when first setting to active
                            dayStartFalse) {
                            setUpdatedPrograms((prevUpdatedPrograms) => {
                              const updatedProgramsList = [
                                ...prevUpdatedPrograms,
                              ]; // Create a copy of the previous state
                              updatedProgramsList[programIndex] = {
                                ...updatedProgramsList[programIndex],
                                [`${day.toLowerCase()}_start`]: "9:00 AM",
                                [`${day.toLowerCase()}_end`]: "9:30 AM",
                              };
                              return updatedProgramsList; // Return the updated array
                            });
                          }
                        }}
                        checked={
                          dayStartTrue
                            ? true
                            : false
                        }
                        className="form-check-input "
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        {/* set text on switch button to  "Disable" if currently active and vice versa */}
                        {dayStartTrue
                          ? "Disable"
                          : "Set Time"}
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <h6 className="me-3">{day}</h6>
                    </div>
                  </div>
                  <div
                    // set opacity to show disabled effect if set to not active
                    className={`row startEndTime ${
                      dayStartTrue
                        ? ""
                        : "pe-none opacity-25"
                    }`}
                  >
                    <div className="col">
                      <div className="btn-group m-1">
                        <h6 className="me-2">Start Time: </h6>
                        <button
                          type="button"
                          className=" btn btn-success dropdown-toggle  "
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ fontSize: "14px" }}
                        >
                          {updatedPrograms[programIndex]?.[
                            `${day.toLowerCase()}_start`
                          ] == null
                            ? "N/A"
                            : updatedPrograms[programIndex]?.[
                                `${day.toLowerCase()}_start`
                              ]}
                        </button>
                        <ul className=" input-start-dropdown dropdown-menu overflow-auto">
                          {timeArray.map((hour, i) => {
                            return (
                              <>
                                <li
                                  key={i}
                                  onClick={() => {
                                    // update start time
                                    setUpdatedPrograms(
                                      (prevUpdatedPrograms) => {
                                        const updatedProgramsList = [
                                          ...prevUpdatedPrograms,
                                        ];
                                        updatedProgramsList[programIndex] = {
                                          ...updatedProgramsList[programIndex],
                                          [`${day.toLowerCase()}_start`]: hour,
                                        };

                                        return updatedProgramsList;
                                      }
                                    );
                                    // update end time so when a user click on
                                    // a given hour for start time, the available end times in dropdown
                                    // are all after given start time
                                    if (
                                      timeArray[i + 1] &&
                                      timeArray[i + 1] != "undefined"
                                    ) {
                                      setUpdatedPrograms(
                                        (prevUpdatedPrograms) => {
                                          const updatedProgramsList = [
                                            ...prevUpdatedPrograms,
                                          ];
                                          updatedProgramsList[programIndex] = {
                                            ...updatedProgramsList[
                                              programIndex
                                            ],
                                            [`${day.toLowerCase()}_end`]:
                                              timeArray[i + 1],
                                          };
                                          return updatedProgramsList;
                                        }
                                      );
                                    }
                                  }}
                                >
                                  <p className="">{hour}</p>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="btn-group m-1">
                        <h6 className="me-3">End Time: </h6>
                        <button
                          style={{ fontSize: "14px" }}
                          type="button"
                          className="btn btn-danger dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {updatedPrograms[programIndex]?.[
                            `${day.toLowerCase()}_start`
                          ] == null
                            ? "N/A"
                            : updatedPrograms[programIndex]?.[
                                `${day.toLowerCase()}_end`
                              ]}
                        </button>
                        <ul className=" input-end-time-dropdown dropdown-menu overflow-auto">
                          {timeArray.map((hour, i) => {
                            return (
                              <>
                                <li
                                  key={i}
                                  onClick={() => {
                                    setUpdatedPrograms(
                                      (prevUpdatedPrograms) => {
                                        const updatedProgramsList = [
                                          ...prevUpdatedPrograms,
                                        ];
                                        updatedProgramsList[programIndex] = {
                                          ...updatedProgramsList[programIndex],
                                          [`${day.toLowerCase()}_end`]: hour,
                                        };
                                        return updatedProgramsList;
                                      }
                                    );
                                  }}
                                >
                                  <p className="">
                                    {/* ternary operator to display end times
                                     only  after selected start Time */}

                                    {updatedPrograms[programIndex]?.[
                                      `${day.toLowerCase()}_start`
                                    ] != undefined &&
                                    i >
                                      timeArray.indexOf(
                                        updatedPrograms[programIndex]?.[
                                          `${day.toLowerCase()}_start`
                                        ]
                                      )
                                      ? hour
                                      : ""}
                                  </p>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* thursday-sunday */}
          <div className="d-flex justify-content-center align-items-center">
            {dayArray.map((day, i) => {
              
              let dayStartTrue =  updatedPrograms[programIndex]?.[
                `${day.toLowerCase()}_start`
              ] &&
              updatedPrograms[programIndex]?.[
                `${day.toLowerCase()}_start`
              ] != null;
              
              let dayStartFalse =  !updatedPrograms[programIndex]?.[
                `${day.toLowerCase()}_start`
              ] &&
              updatedPrograms[programIndex]?.[
                `${day.toLowerCase()}_start`
              ] == null;

              return (
                <div
                  key={i}
                  className={`dayCheck border p-2 ${
                    i > 2 ? "d-md-block d-lg-block d-none" : "d-none"
                  }`}
                  style={{ width: "30%" }}
                >
                  <div className="col d-flex">
                    <div className="form-check form-switch ">
                      <input
                        onClick={() => {
                          if (
                            dayStartTrue
                          ) {
                            
                            setUpdatedPrograms((prevUpdatedPrograms) => {
                              const updatedProgramsList = [
                                ...prevUpdatedPrograms,
                              ];
                              updatedProgramsList[programIndex] = {
                                ...updatedProgramsList[programIndex],
                                [`${day.toLowerCase()}_start`]: null,
                                [`${day.toLowerCase()}_end`]: null,
                              };
                              return updatedProgramsList;
                            });
                          } else if (
                            dayStartFalse
                          ) {
                            setUpdatedPrograms((prevUpdatedPrograms) => {
                              const updatedProgramsList = [
                                ...prevUpdatedPrograms,
                              ];
                              updatedProgramsList[programIndex] = {
                                ...updatedProgramsList[programIndex],
                                [`${day.toLowerCase()}_start`]: "9:00 AM",
                                [`${day.toLowerCase()}_end`]: "9:30 AM",
                              };
                              return updatedProgramsList;
                            });
                          }
                        }}
                        checked={
                          dayStartTrue
                            ? true
                            : false
                        }
                        className="form-check-input "
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        {dayStartTrue
                          ? "Disable"
                          : "Set Time"}
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <h6 className="me-3">{day}</h6>
                    </div>
                  </div>
                  <div
                    className={`row startEndTime ${
                      dayStartTrue
                        ? ""
                        : "pe-none opacity-25"
                    }`}
                  >
                    <div className="col">
                      <div className="btn-group m-1">
                        <h6 className="me-2">Start Time: </h6>
                        <button
                          type="button"
                          className=" btn btn-success dropdown-toggle  "
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ fontSize: "14px" }}
                        >
                          {updatedPrograms[programIndex]?.[
                            `${day.toLowerCase()}_start`
                          ] == null
                            ? "N/A"
                            : updatedPrograms[programIndex]?.[
                                `${day.toLowerCase()}_start`
                              ]}
                        </button>
                        <ul className="input-start-dropdown dropdown-menu overflow-auto">
                          {timeArray.map((hour, i) => {
                            return (
                              <>
                                <li
                                  key={i}
                                  onClick={() => {
                                    setUpdatedPrograms(
                                      (prevUpdatedPrograms) => {
                                        const updatedProgramsList = [
                                          ...prevUpdatedPrograms,
                                        ];
                                        updatedProgramsList[programIndex] = {
                                          ...updatedProgramsList[programIndex],
                                          [`${day.toLowerCase()}_start`]: hour,
                                        };

                                        return updatedProgramsList;
                                      }
                                    );
                                    if (
                                      timeArray[i + 1] &&
                                      timeArray[i + 1] != "undefined"
                                    ) {
                                      setUpdatedPrograms(
                                        (prevUpdatedPrograms) => {
                                          const updatedProgramsList = [
                                            ...prevUpdatedPrograms,
                                          ];
                                          updatedProgramsList[programIndex] = {
                                            ...updatedProgramsList[
                                              programIndex
                                            ],
                                            [`${day.toLowerCase()}_end`]:
                                              timeArray[i + 1],
                                          };
                                          return updatedProgramsList;
                                        }
                                      );
                                    }
                                  }}
                                >
                                  <p className="">{hour}</p>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="btn-group m-1">
                        <h6 className="me-3">End Time: </h6>
                        <button
                          style={{ fontSize: "14px" }}
                          type="button"
                          className="btn btn-danger dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {updatedPrograms[programIndex]?.[
                            `${day.toLowerCase()}_start`
                          ] == null
                            ? "N/A"
                            : updatedPrograms[programIndex]?.[
                                `${day.toLowerCase()}_end`
                              ]}
                        </button>
                        <ul className="input-end-dropdown dropdown-menu overflow-auto">
                          {timeArray.map((hour, i) => {
                            return (
                              <>
                                <li
                                  key={i}
                                  onClick={() => {
                                    setUpdatedPrograms(
                                      (prevUpdatedPrograms) => {
                                        const updatedProgramsList = [
                                          ...prevUpdatedPrograms,
                                        ];
                                        updatedProgramsList[programIndex] = {
                                          ...updatedProgramsList[programIndex],
                                          [`${day.toLowerCase()}_end`]: hour,
                                        };
                                        return updatedProgramsList;
                                      }
                                    );
                                  }}
                                >
                                  <p className="">
                                    {updatedPrograms[programIndex]?.[
                                      `${day.toLowerCase()}_start`
                                    ] != undefined &&
                                    i >
                                      timeArray.indexOf(
                                        updatedPrograms[programIndex]?.[
                                          `${day.toLowerCase()}_start`
                                        ]
                                      )
                                      ? hour
                                      : ""}
                                  </p>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <span
          className={`${
            store.inputStatusMessage == "" && errorMessage == "" ? "d-none" : "d-block"
          }  ${
            store.inputStatusMessage == "Programs successfully updated!"
              ? "text-success"
              : "text-danger"
          }  mb-0`}
          role="alert"
        >
          {errorMessage == ""   ? store?.inputStatusMessage : errorMessage}
        </span>
        <div className="row mt-4 submitReset">
          <div className=" d-flex align-items-center">
            <button
              type="submit"
              style={{
                border: "2.5px solid rgb(0 223 255)",
                boxShadow: "rgb(5 218 210) 0px 1px 4.5px 0px",
                paddingBottom:"2rem"
              }}
              onClick={(e) => {
                if(programName.length == 0 && programDescription.length == 0){
                  setErrorMessage("Program name and description cannot be left blank")
                }
                else if(programName.length == 0 ){
                  setErrorMessage("Program name cannot be left blank")
                }
                else if(programDescription.length == 0 ){
                  
                  setErrorMessage("Program description cannot be left blank")
                }
                else if(newProgram){
                  setErrorMessage("")
                  e.preventDefault();
                  setProgramIndex(0);
                  setRefresh(true);
                  // actions.newProgram(updatedPrograms);
                  console.log(updatedPrograms[updatedPrograms.length-1],"new progs")
                  setNewProgram(false)
                  setDropdownTitle(updatedPrograms[0])
                }

                else {
                  setErrorMessage("")
                  e.preventDefault();
                  setProgramIndex(0);
                  setRefresh(true);
                  actions.updateProgram(updatedPrograms);
                }
              }}
              className=" btn  px-3 me-3 h-50"
            >
              {newProgram ? "Save" : "Submit"} {newProgram && programName == "" ? "New Program" : newProgram ? programName: ""} 
            </button>
            {newProgram ? <>
              <button
              className="btn me-5"
              style={{
                border: "1.5px solid rgb(252 10 10)",
                boxShadow: "rgb(204 0 0) 0px 1px 4.5px 0px",
              }}
              aria-expanded="false"
            >
              Cancel
            </button>
            </>:""}
            <div>
              <UpdateLink
                title="Back to schedule!"
                link="/"
                rotate={true}
                width="100%"
                icon={faHouseCircleCheck}
                pt="pt-0"
                mb="mb-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Input;