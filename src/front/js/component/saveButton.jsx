import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../store/appContext";
//import defaultAvatar from "../../img/avatar.jpg"
import styled from "styled-components";
const SaveButton = () => {
  
  return (
    <StyledWrapper>
      <button className="action_has has_saved" aria-label="save" type="button">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
        >
          <path
            d="m19,21H5c-1.1,0-2-.9-2-2V5c0-1.1.9-2,2-2h11l5,5v11c0,1.1-.9,2-2,2Z"
            strokeLinejoin="round"
            strokeLinecap="round"
            data-path="box"
          />
          <path
            d="M7 3L7 8L15 8"
            strokeLinejoin="round"
            strokeLinecap="round"
            data-path="line-top"
          />
          <path
            d="M17 20L17 13L7 13L7 20"
            strokeLinejoin="round"
            strokeLinecap="round"
            data-path="line-bottom"
          />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .action_has {
  width: 50px;
  height: 50px;
  --color: 0 0% 60%;
  --color-has: 211deg 100% 48%;    
  --sz: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.5rem;
  border-radius: 0.375rem;
  border-color:white;
  background-color: white; /* Fondo blanco */
  color: black; /* Texto y bordes negros */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.has_saved:hover {
  border-color: hsl(var(--color-has));
}
.has_liked:hover svg,
.has_saved:hover svg {
  color: hsl(var(--color-has));
}

.has_liked svg,
.has_saved svg {
  overflow: visible;
  height: calc(var(--sz) * 1.75);
  width: calc(var(--sz) * 1.75);
  --ease: cubic-bezier(0.5, 0, 0.25, 1);
  --zoom-from: 1;
  --zoom-via: 0.75;
  --zoom-to: 0.;
  --duration: 1s;
}

.has_saved:hover path[data-path="box"] {
  transition: all 0.3s var(--ease);
  animation: has-saved var(--duration) var(--ease) forwards;
  fill: hsl(var(--color-has) / 0.35);
}
.has_saved:hover path[data-path="line-top"] {
  animation: has-saved-line-top var(--duration) var(--ease) forwards;
}
.has_saved:hover path[data-path="line-bottom"] {
  animation: has-saved-line-bottom var(--duration) var(--ease) forwards,
    has-saved-line-bottom-2 calc(var(--duration) * 1) var(--ease)
      calc(var(--duration) * 0.75);
}

@keyframes has-saved-line-top {
  33.333% {
    transform: rotate(0deg) translate(1px, 2px) scale(var(--zoom-from));
    d: path("M 3 5 L 3 8 L 3 8");
  }
  66.666% {
    transform: rotate(20deg) translate(2px, -2px) scale(var(--zoom-via));
  }
  99.999% {
    transform: rotate(0deg) translate(0px, 0px) scale(var(--zoom-to));
  }
}
@keyframes has-saved-line-bottom {
  33.333% {
    transform: rotate(0deg) translate(1px, 2px) scale(var(--zoom-from));
    d: path("M 17 20 L 17 13 L 7 13 L 7 20");
  }
  66.666% {
    transform: rotate(20deg) translate(2px, -2px) scale(var(--zoom-via));
  }
  99.999% {
    transform: rotate(0deg) translate(0px, 0px) scale(var(--zoom-to));
    d: path("M 17 21 L 17 21 L 7 21 L 7 21");
  }
}
@keyframes has-saved-line-bottom-2 {
  from {
    d: path("M 17 21 L 17 21 L 7 21 L 7 21");
  }
  to {
    transform: rotate(0deg) translate(0px, 0px) scale(var(--zoom-to));
    d: path("M 17 20 L 17 13 L 7 13 L 7 20");
    fill: white;
  }
}
@keyframes has-saved {
  33.333% {
    transform: rotate(0deg) translate(1px, 2px) scale(var(--zoom-from));
  }
  66.666% {
    transform: rotate(20deg) translate(2px, -2px) scale(var(--zoom-via));
  }
  99.999% {
    transform: rotate(0deg) translate(0px, 0px) scale(var(--zoom-to));
  }
}

`;

export default SaveButton;