import React, { useContext } from "react";

const AboutSection = () => {
    return (

        <div className="container-full black-background">

            <div className="about">

                <div className="col-md-5 mb-4 image-container">
                    {/*  <img src="/workspaces/ryandornan-full-stack-project/src/front/img/how-to.png"></img> */} 
                </div>

                <div className="col-md-5 mb-4">

                    <h1 className="mt-4 mb-5">About Us</h1>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id odio ultrices, rhoncus leo ac, 
                        placerat diam. Etiam id nulla ut est interdum mattis a eget tellus. Integer in erat imperdiet 
                        orci ullamcorper venenatis. </p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id odio ultrices, rhoncus leo ac, 
                        placerat diam. Etiam id nulla ut est interdum mattis a eget tellus. Integer in erat imperdiet 
                        orci ullamcorper venenatis. </p>

                    <button class="btn btn-primary custom-btn mt-5" id="signUpBtn">Sign Up</button>

                </div>

            </div>
        </div>
    );
  };
  
  export default AboutSection;
  