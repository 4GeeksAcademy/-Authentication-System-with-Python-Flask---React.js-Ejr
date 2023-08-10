import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import GooglePay from './GooglePay';
import { Link } from 'react-router-dom';

const BusinessOfferCard = ({ searchQuery }) => {
  const { store, actions } = useContext(Context);
  const [editContentId, setEditContentId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editNormalPrice, setEditNormalPrice] = useState(0);
  const [editPremiumPrice, setEditPremiumPrice] = useState(0);

  useEffect(() => {
    actions.getAllOffers();
    console.log("Fetch for all offers is working")
  }, []);

  const handleUpdate = (id) => {
    const offerToUpdate = store.offers.find((offer) => offer.id === id);
    if (offerToUpdate) {
      setEditTitle(offerToUpdate.offer_title);
      setEditDescription(offerToUpdate.offer_description);
      setEditNormalPrice(offerToUpdate.normal_user_price);
      setEditPremiumPrice(offerToUpdate.premium_user_price);
      setEditContentId(id);
    }
  };

  const handleSave = (id) => {
    const offerToUpdate = store.offers.find((offer) => offer.id === id);
    if (offerToUpdate) {
      offerToUpdate.offer_title = editTitle;
      offerToUpdate.offer_description = editDescription;
      offerToUpdate.normal_user_price = editNormalPrice;
      offerToUpdate.premium_user_price = editPremiumPrice;
      setEditTitle("");
      setEditDescription("");
      setEditNormalPrice(0);
      setEditPremiumPrice(0);
      setEditContentId(null);
    }
  };

  const handleDelete = (id) => {
    actions.deleteOfferById(id);
    window.location.reload();
  };



  return (
    <div className='cards-offer'>
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
          return (
            <div
              key={business_offer.id}
              className="card card-offer mb-3 mt-4">
              <img src={business_offer.offer_image} className="card-img-top" alt="..."></img>
              <div className="card-body">
                <div className="div-title-offer">
                  {editContentId === business_offer.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    <h5 className="card-title offer-title">{business_offer.offer_title}</h5>
                  )}
                </div>
                <div className='infos-country'>
                  <p className="card-text country-offer">{business_offer.country}</p>
                  <p className="card-text city-offer">{business_offer.city}</p>
                </div>
                {editContentId === business_offer.id ? (
                  <div className="comment-review">
                    <textarea
                      autoFocus={true}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows="7"
                      cols="38"
                      maxLength="300"
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>
                ) : (
                  <p className="card-text">{business_offer.offer_description}</p>
                )}
                <div className='offer-price'>
                  {editContentId === business_offer.id ? (
                    <input
                      type="number"
                      value={editNormalPrice}
                      onChange={(e) => setEditNormalPrice(e.target.value)}
                    />
                  ) : (
                    <p className="card-text price-user">Precio normal : <span className='price'>{business_offer.normal_user_price.toLocaleString()}$</span></p>
                  )}
                  {editContentId === business_offer.id ? (
                    <input
                      type="number"
                      value={editPremiumPrice}
                      onChange={(e) => setEditPremiumPrice(e.target.value)}
                    />
                  ) : (
                    <p className="card-text price-user">Precio premium : <span className='price'>{business_offer.premium_user_price.toLocaleString()}$</span></p>
                  )}
                </div>
                <div className="btn-options d-flex justify-content-end">
                  {editContentId === business_offer.id &&
                    <button onClick={() => handleSave(business_offer.id)}>Validar</button>
                  }

                  {store.business_user.id === business_offer.business_id &&
                    // || store.user.is_admin 
                    <>
                      <button
                        className="btn-up-offer"
                        onClick={() => handleUpdate(business_offer.id)}
                      >
                        &#9998;
                      </button>
                      <button
                        className="btn-delete-offer"
                        onClick={() => handleDelete(business_offer.id)}
                      >
                        &#10008;
                      </button>
                    </>
                  }
                </div>
                {/* <GooglePayButton
                  normalUserPrice={business_offer.normal_user_price}
                  premiumUserPrice={business_offer.premium_user_price}
                /> */}
                <Link to='/opciones-de-pago'>
                  <button className='btn-buy'>Comprar</button>
                </Link>
              </div>
            </div>
          )
        })}
    </div>
  );
};

export default BusinessOfferCard;






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

