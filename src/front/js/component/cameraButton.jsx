import React from "react";
import styled from "styled-components";


const CameraButton = () => {
    return (
        <StyledWrapper>
            <button className="btn" type="file" htmlFor="fileInput"><i className="fas fa-camera"></i></button>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .btn {
  width: 50px;
  height: 50px;
 position: relative;
 font-size: 17px;
 text-transform: uppercase;
 text-decoration: none;
 display: inline-block;
 border-radius: 6em;
 transition: all .2s;
 border: none;
 font-family: inherit;
 font-weight: 500;
 color: black;
box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
 background-color: white;
}

.btn:hover {
 transform: translateY(-3px);
 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
 transform: translateY(-1px);
 box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.btn::after {
 content: "";
 display: inline-block;
 height: 100%;
 width: 100%;
 border-radius: 100px;
 position: absolute;
 top: 0;
 left: 0;
 z-index: -1;
 transition: all .4s;
}

.btn::after {
 background-color: #fff;
}

.btn:hover::after {
 transform: scaleX(1.4) scaleY(1.6);
 opacity: 0;
}
`;

export default CameraButton;
