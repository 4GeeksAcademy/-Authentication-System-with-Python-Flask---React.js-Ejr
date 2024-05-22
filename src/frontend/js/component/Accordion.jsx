import React, { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { HiOutlineMinus } from "react-icons/hi";

const Accordion = ({question, answer}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="py-2">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex w-full h-full justify-between items-center"
      >
        <p className="f-tittle text-w flex">{question}</p>
        {!accordionOpen ? <span><HiOutlinePlus className="text-yellow-400 text-3xl"/></span> : <span className="text-yellow-400 text-3xl"><HiOutlineMinus /></span>}
     
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100 py-2"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden text-w mr-10 f-body-sm">{answer}</div>
      </div>
    </div>
  );
};

export default Accordion;
