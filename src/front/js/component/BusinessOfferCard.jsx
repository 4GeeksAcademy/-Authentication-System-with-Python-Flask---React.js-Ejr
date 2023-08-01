import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BusinessOfferCard = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAllOffers();
    console.log("Fetch for all offers is working")
  }, []);

  return (
    <>
    <Formik
      initialValues={{
        offer_title: "",
        offer_description: "",
        country: "",
        city: "",
        normal_user_price: "",
        medium_user_price: "",
        high_user_price: "",
        premium_user_price: "",
      }}
      validationSchema={Yup.object({
        offer_title: Yup.string().min(10, 'Debe tener 10 caracteres o más').required('Obligatorio'),
        offer_description: Yup.string().min(40, 'Debe tener 40 caracteres o más').required('Obligatorio'),
        country: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio'),
        city: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio'),
        normal_user_price: Yup.number().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio').typeError('Debe ser un número').integer('Debe ser un número entero'),
        medium_user_price: Yup.number().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio').typeError('Debe ser un número').integer('Debe ser un número entero'),
        high_user_price: Yup.number().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio').typeError('Debe ser un número').integer('Debe ser un número entero'),
        premium_user_price: Yup.number().min(2, 'Debe tener 2 caracteres o más').required('Obligatorio').typeError('Debe ser un número').integer('Debe ser un número entero'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // Call your async submit function here (You can also use your handleSubmit function)
        console.log("Form submitted:", values);

        actions.createOffer(values)
          .then(() => {
            // Handle successful submission
            console.log("Form submitted successfully!");
          })
          .catch((error) => {
            // Handle submission error
            console.error("Error submitting form:", error);
            alert("Something gets wrong");
          })
          .finally(() => {
            setSubmitting(false); // Set submitting to false after submission is done
          });
      }}

    >
      {formik => (

        <div>
          {store.auth ? (
            <Form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="offer_title">Título:</label>
                <Field type="title" name='offer_title' value={formik.values.offer_title} />
                <ErrorMessage name='offer_title' />
              </div>

              <div>
                <label htmlFor="offer_description">Descripción de la oferta:</label>
                <Field type="text" name='offer_description' value={formik.values.offer_description} />
                <ErrorMessage name='offer_description' />
              </div>


              <div>
                <label htmlFor="country">País:</label>
                <Field type="text" name='country' value={formik.values.country} />
                <ErrorMessage name='country' />
              </div>

              <div>
                <label htmlFor="city">Ciudad:</label>
                <Field type="text" name='city' value={formik.values.city} />
                <ErrorMessage name='city' />
              </div>

              <div>
                <label htmlFor="normal_user_price">Precio para Usuario:</label>
                <Field type="number" name='normal_user_price' value={formik.values.normal_user_price} />
                <ErrorMessage name='normal_user_price' />
              </div>

              <div>
                <label htmlFor="medium_user_price">Precio para Usuario Medio:</label>
                <Field type="number" name='medium_user_price' value={formik.values.medium_user_price} />
                <ErrorMessage name='medium_user_price' />
              </div>

              <div>
                <label htmlFor="high_user_price">Precio para Usuario Alto:</label>
                <Field type="number" name='high_user_price' value={formik.values.high_user_price} />
                <ErrorMessage name='high_user_price' />
              </div>

              <div>
                <label htmlFor="premium_user_price">Precio para Usuario Premium:</label>
                <Field type="number" name='premium_user_price' value={formik.values.premium_user_price} />
                <ErrorMessage name='premium_user_price' />
              </div>

              <button type="submit" className="btn btn-primary btn-signup" >Publicar mi oferta</button>
            </Form>
          ) : null}

          {/* Publicar las cartas que ya existen */}


        </div>
      )
      }
    </Formik>

              {store.offers && store.offers.length >1 && store.offers.map((business_offer) => {
                return(
            <div
              key={business_offer.id}
              className="card mb-3 mt-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM23JE5rZmCQhGdgwGRj_jNOKbsrGP5C_t-g&usqp=CAU" className="card-img-top" alt="..."></img>

              <div className="card-body">
                <h5 className="card-title">{business_offer.offer_title}</h5>
                <p className="card-text">{business_offer.offer_description}</p>
                <p className="card-text">{business_offer.city}</p>
                <p className="card-text">{business_offer.country}</p>
                <p className="card-text">{business_offer.normal_user_price}</p>
                <p className="card-text">{business_offer.medium_user_price}</p>
                <p className="card-text">{business_offer.high_user_price}</p>
                <p className="card-text">{business_offer.premium_user_price}</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
)})}
    </>
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
