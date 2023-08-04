import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import GooglePay from './GooglePay.js'


const BusinessOfferCard = ({ searchQuery }) => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getAllOffers();
    console.log("Fetch for all offers is working")
  }, []);

  return (
    <div className='cards-offers cards-offer'>
      {store.offers
        .filter(
          (business_offer) =>
            business_offer.offer_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            business_offer.offer_description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) || business_offer.country.toLowerCase().includes(searchQuery.toLowerCase()) || business_offer.city.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => b.id - a.id)
        .map((business_offer) => {
          // store.offers && store.offers.length > 1 && 
          return (
            <div
              key={business_offer.id}
              className="card card-offer mb-3 mt-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM23JE5rZmCQhGdgwGRj_jNOKbsrGP5C_t-g&usqp=CAU" className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title offer-title">{business_offer.offer_title}</h5>
                <div className='infos-country'>
                  <p className="card-text country-offer">{business_offer.country}</p>
                  <p className="card-text city-offer">{business_offer.city}</p>
                </div>
                <p className="card-text">{business_offer.offer_description}</p>
                <div className='offer-price'>
                  <p className="card-text price-user">Precio normal : <span className='price'>{business_offer.normal_user_price.toLocaleString()}$</span></p>
                  {/* <p className="card-text">{business_offer.medium_user_price}</p>
                  <p className="card-text">{business_offer.high_user_price}</p> */}
                  <p className="card-text price-user">Precio prenium : <span className='price'>{business_offer.premium_user_price.toLocaleString()}$</span></p>
                </div>
                {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago {business_offer.business_id}</small></p> */}
                <GooglePay />

              </div>
            </div>
          )
        })}
    </div>
  );
};






// const [formData, setFormData] = useState({
//   offer_title: "",
//   offer_description: "",
//   normal_user_price: "",
//   medium_user_price: "",
//   high_user_price: "",
//   premium_user_price: "",
// });

// const handleChange = (e) => {
//   setFormData({ ...formData, [e.target.name]: e.target.value });
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   actions.createOffer(formData);
// };

// useEffect(() => {
//   actions.getAllOffers();
//   console.log("Fetch for all offers is working")
// }, []);

//   return (
//     <div>
//       {store.auth ? (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="offer_title">Title:</label>
//             <input
//               type="text"
//               id="offer_title"
//               name='offer_title'
//               value={formData.offer_title}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label htmlFor="offer_description">Offer description:</label>
//             <input
//               type="text"
//               id='offer_description'
//               name='offer_description'
//               value={formData.offer_description}
//               onChange={handleChange} />
//           </div>

//           <div>
//             <label htmlFor="normal_user_price">Normal User Price:</label>
//             <input
//               type="text"
//               id='normal_user_price'
//               name='normal_user_price'
//               value={formData.normal_user_price}
//               onChange={handleChange} />
//           </div>

//           <div>
//             <label htmlFor="medium_user_price">Medium User Price:</label>
//             <input
//               type="text"
//               id='medium_user_price'
//               name='medium_user_price'
//               value={formData.medium_user_price}
//               onChange={handleChange} />
//           </div>

//           <div>
//             <label htmlFor="high_user_price">High User Price:</label>
//             <input
//               type="text"
//               id='high_user_price'
//               name='high_user_price'
//               value={formData.high_user_price}
//               onChange={handleChange} />
//           </div>

//           <div>
//             <label htmlFor="premium_user_price">Premium User Price:</label>
//             <input
//               type="text"
//               id='premium_user_price'
//               name='premium_user_price'
//               value={formData.premium_user_price}
//               onChange={handleChange} />
//           </div>
//           <button type="submit">Submit Offer</button>
//         </form>
//       ) : null}

//       {/* Publicar las cartas que ya existen */}

//       {store.offers.map((business_offer) => (
//         <div
//           key={business_offer.id}
//           className="card mb-3 mt-4">
//           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM23JE5rZmCQhGdgwGRj_jNOKbsrGP5C_t-g&usqp=CAU" className="card-img-top" alt="..."></img>

//           <div className="card-body">
//             <h5 className="card-title">{business_offer.offer_title}</h5>
//             <p className="card-text">{business_offer.offer_description}</p>
//             <p className="card-text">{business_offer.normal_user_price}</p>
//             <p className="card-text">{business_offer.medium_user_price}</p>
//             <p className="card-text">{business_offer.high_user_price}</p>
//             <p className="card-text">{business_offer.premium_user_price}</p>
//             <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

export default BusinessOfferCard
