import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../store/appContext";
import Moviestar from "../../img/Moviestar.png";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../component/Spinner";


export const PassChange = () => {
    const { store, actions } = useContext(Context);
    const [form, setForm] = React.useState({ new_password: "", confirm_password: "" })
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleChange = (e) => {
        const key = e.target.name
        const value = e.target.value
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const passchange = await actions.passchange(form)
        if (passchange === true) {
            navigate("/")
        }
        setLoading(false)
    };

    return (
        <div>
             {loading ? (    
			<Spinner/>
		  ) : (
            <div className="text-center mt-5">
                <img id="image" src={Moviestar} />
                <form onSubmit={onSubmit}>
                    <div>
                        <input className="text-center" name="new_password" onChange={handleChange} type="password" id="new_password" placeholder="New Password" value={form.new_password} required></input>
                    </div>
                    <br />
                    <div>
                        <input className="text-center" name="confirm_password" onChange={handleChange} type="password" id="confirm_password" placeholder="Confirm Password" value={form.confirm_password} required></input>
                        <br />
                    </div>
                    <br />
                    <button type="submit" id="recovery-button">Confirm</button>
                    <br />
                </form>
            </div>
             )}
        </div>
    );
};


