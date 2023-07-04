import React, { useEffect, useState, useContext } from 'react';
import CanchaCard from '../component/CanchaCard';
import { Context } from '../store/appContext';
import { HomeLogin } from './homeLogin';

const RenderCanchas = () => {
    const [canchas, setCanchas] = useState([]);
    const { actions } = useContext(Context);

    useEffect(() => {
        const fetchCanchas = async () => {
            try {
                const canchasData = await actions.fetchCanchas();
                console.log(canchasData, "canchasData");
                setCanchas(canchasData);
            } catch (error) {
                console.log("Error fetching canchas:", error);
            }
        };

        fetchCanchas();
    }, []);

    return canchas.slice(0, 6).map((cancha, canchaIndex) => (
        <div className="row" key={canchaIndex}>
            <div className="col">
                <HomeLogin cancha={cancha} />
            </div>
        </div>
    ));
};

export default RenderCanchas;