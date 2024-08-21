import React, { useState } from 'react'
import fireGif from '../../img/fire.gif'
const EXAMPLE = [
  { data: "2024-08-01", statusB: "Gimnasio", completed: true },
  { data: "2024-08-02", statusB: "Gimnasio", completed: false },
  { data: "2024-08-03", statusB: "Gimnasio", completed: true },
  { data: "2024-08-04", statusB: "Gimnasio", completed: true },
  { data: "2024-08-05", statusB: "Gimnasio", completed: false },
  { data: "2024-08-06", statusB: "Gimnasio", completed: true }
];

const calculateStreak = (data) => {
  let streak = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].completed) {
      streak++;
    } else {
      streak = 0;
    }
  }

  return streak;
};

const Streak = () => {
  const [curIdx, setCurIdx] = useState(EXAMPLE.length - 1);
  const [prevIdx, setPrevIdx] = useState(-1);

  const curStatus = EXAMPLE[curIdx].statusB;
  const prevStatus = prevIdx >= 0 ? EXAMPLE[prevIdx].statusB : "";

  const streak = calculateStreak(EXAMPLE);

  return (
    <div>
      {/* <div
        className="text-neutral-300 text-sm"
        style={{
          width: "80%",
          height: "80px",
          margin: "0 auto",
          marginTop: "20px"
        }}
      >
        <HorizontalTimeline
          styles={{
            background: "#171717",
            foreground: "#1A79AD",
            outline: "#404040"
          }}
          index={curIdx}
          indexClick={(index) => {
            setPrevIdx(curIdx);
            setCurIdx(index);
          }}
          values={EXAMPLE.map((x) => x.data)}
          isTouchEnabled={true}
          minEventPadding={70}
          maxEventPadding={70}
        />
      </div> */}
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="animate-pulse relative flex items-end justify-center">
          <img className=' size-48 -mb-4' src={fireGif}></img>
          <span className='absolute text-4xl font-bold text-orange-600 z-20 bitsfont' style={{ textShadow: "2px 2px 2px black", transform: "translateX(8px)" }}
          >{streak}</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <span className="text-neutral-400 font-bold text-lg bitsfont">Racha de dias</span>
        </div>
      </div>
    </div>
  );
};

export default Streak;
