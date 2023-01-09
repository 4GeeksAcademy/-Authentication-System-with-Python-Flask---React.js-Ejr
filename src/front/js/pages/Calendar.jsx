import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/calendar.css";

export const Calendar = () => {

	return (
            <>
            <Navbar />
		<div className="position-absolute top-50 start-50 translate-middle">
            <div className="year">
			    <div className="mes mes1"><div className="ene"><button>ENE</button></div></div>
                <div className="mes mes2"><div className="feb"><button>FEB</button></div></div>
                <div className="mes mes3"><div className="mar"><button>MAR</button></div></div>
                <div className="mes mes4"><div className="abr"><button>ABR</button></div></div>
                <div className="mes mes5"><div className="may"><button>MAY</button></div></div>
                <div className="mes mes6"><div className="jun"><button>JUN</button></div></div>
                <div className="mes mes7"><div className="jul"><button>JUL</button></div></div>
                <div className="mes mes8"><div className="ago"><button>AGO</button></div></div>
                <div className="mes mes9"><div className="sep"><button>SEP</button></div></div>
                <div className="mes mes10"><div className="oct"><button>OCT</button></div></div>
                <div className="mes mes11"><div className="nov"><button>NOV</button></div></div>
                <div className="mes mes12"><div className="dic"><button>DIC</button></div></div>
		    </div>
        </div>
        </>
	);
};