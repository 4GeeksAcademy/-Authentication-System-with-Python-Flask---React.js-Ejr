import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/InformationCard.css";

const RentInformationCard = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!");
        console.log("Selected date:", selectedDate);
        console.log("Selected time:", selectedTime);
    };

    return (
        <>
            <div>
                <div className="card bg-dark text-white">
                    <img
                        src="https://uploads-ssl.webflow.com/632871e15b53a0140af28aeb/633b061d864ce251bb36073e_pexels-markus-spiske-1752757.jpg"
                        className="card-img"
                        alt="Stony Beach"
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-end ">


                        <p className="card-text">Available</p>
                        <div className="row">
                            <div className="col mt-4 pt-4">
                                <h5 className="card-title ">Basketball court "El Toñito"</h5>
                                <p className="card-text mt-4 pt-4">
                                    Welcome to our sports center! You can rent a basketball court here
                                    and experience the thrill of the game. Grab your friends, shoot
                                    some hoops, and have a great time! Our court is top-notch with a
                                    wooden floor, proper markings, and sturdy baskets. Whether you're
                                    a seasoned player or just starting out, our court is perfect for
                                    some fun and active play. Book your slot now and enjoy the
                                    excitement of basketball!
                                </p>
                            </div>
                            <div className="col ">
                                <div className="col d-flex justify-content-end ">
                                    <div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group ">
                                                <label htmlFor="name"></label>
                                                <input type="text" className="form-control bg-warning " id="name" placeholder="Name" required />
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor="email"></label>
                                                <input type="email" className="form-control bg-warning" id="email" placeholder="Email" required />
                                            </div>
                                            <div className="form-group  mb-4 ">
                                                <label htmlFor="phone"></label>
                                                <input type="tel" className="form-control bg-warning" id="phone" placeholder="Phone" required />
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor="date"></label>
                                                <DatePicker
                                                    className="form-control bg-warning text-dark" placeholderText="Select Date"
                                                    id="date"
                                                    selected={selectedDate}
                                                    onChange={(date) => setSelectedDate(date)}
                                                    dateFormat="yyyy-MM-dd"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group text-dark mb-4">
                                                <label htmlFor="time"></label>
                                                <select
                                                    className="form-control bg-warning"
                                                    id="time"
                                                    value={selectedTime}
                                                    onChange={(e) => setSelectedTime(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Select a time</option>
                                                    <option value="09:00">9:00 AM</option>
                                                    <option value="11:00">11:00 AM</option>
                                                    <option value="13:00">1:00 PM</option>
                                                    <option value="15:00">3:00 PM</option>
                                                    <option value="17:00">5:00 PM</option>
                                                    <option value="19:00">7:00 PM</option>
                                                    <option value="21:00">9:00 PM</option>
                                                    <option value="23:00">11:00 PM</option>
                                                </select>
                                            </div>
                                            <button type="submit" className="button-32">
                                                Rent Now
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};




export default RentInformationCard