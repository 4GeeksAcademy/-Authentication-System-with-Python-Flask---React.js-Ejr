import React, { useEffect, useState, useContext } from 'react';
import CanchaCard from '../component/CanchaCard';
import { Context } from '../store/appContext';

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
                <CanchaCard cancha={cancha} />
            </div>
        </div>
    ));
};

export default RenderCanchas;


// const { store, actions } = useContext(Context);
// const images = [
//   "https://cdn.versacourt.com/cmss_files/imagelibrary/general-use/thb-court-size.jpg",
//   "https://www.totalsportsolutions.ca/Content/images/product_main/sm/20'x28'-Backyard-Basketball-Court-Raptors-logo-King-City-ON.v637853122246000843.jpg",
//   "https://www.snapsports.com/wp-content/uploads/2023/05/orange-gray-header.jpg"
// ];

// const renderCanchas = () => {
//   const [imageIndex, setImageIndex] = useState(0);

//   useEffect(() => {
//     fetchCanchas();
//   }, []);

//   const fetchCanchas = async () => {
//     try {
//       const canchasData = await actions.fetchCanchas();
//       console.log(canchasData, "canchasData");
//       setCanchas(canchasData);
//     } catch (error) {
//       console.log("Error fetching canchas:", error);
//     }
//   };

//   const [canchas, setCanchas] = useState([]);

//   return canchas.map((cancha, canchaIndex) => {}
