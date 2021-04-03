import React from "react";
// import { Link } from "react-router-dom";
import "../styles/home.css";
import Picture from "/workspace/canchapp2/src/front/img/vectorstock_8229541.png";
import Step1 from "/workspace/canchapp2/src/front/img/step1.jpg";
import Step2 from "/workspace/canchapp2/src/front/img/step2.jpg";
import Step3 from "/workspace/canchapp2/src/front/img/step3.jpg";
import Step4 from "/workspace/canchapp2/src/front/img/step4.jpg";

const Stepper = () => {
	return (
		<>
			<div className="row">
				<div className="col-sm-3">
					<div className="card">
						<div className="card-body">
							<img src={Step1} className="card-img" alt="..." />
						</div>
					</div>
				</div>

				<div className="col-sm-3">
					<div className="card">
						<div className="card-body">
							<img src={Step2} className="card-img" alt="..." />
						</div>
					</div>
				</div>
				<div className="col-sm-3">
					<div className="card">
						<div className="card-body">
							<img src={Step3} className="card-img" alt="..." />
						</div>
					</div>
				</div>
				<div className="col-sm-3">
					<div className="card">
						<div className="card-body">
							<img src={Step4} className="card-img" alt="..." />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Stepper;
