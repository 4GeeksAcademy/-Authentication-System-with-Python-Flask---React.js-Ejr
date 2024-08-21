import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';


const AddProduct = () => {
  const { store, actions } = useContext(Context);
	const [file, setFile] = useState()
	const uploadImage = async (image) =>{
		const data = new FormData()
		data.append('image', file)
		console.log(data)
		const response = await actions.uploadImage(data)
	}

  const formik = useFormik({
    initialValues: {
      name: '',
      cost: '',
      image_url: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required'),
      cost: Yup.string()
        .required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    
      
//       <form onSubmit={formik.handleSubmit}>
//       <label htmlFor="name">Name</label>
//       <input
//         id="name"
//         name="name"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.name}
//       />
      
//       {formik.touched.name && formik.errors.name ? (
//         <div>{formik.errors.name}</div>
//       ) : null}
    
//       <label htmlFor="cost">Cost</label>
//       <input
//         id="cost"
//         name="cost"
//         type="string"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.cost}
//       />
//       {formik.touched.cost && formik.errors.cost ? (
//         <div>{formik.errors.cost}</div>
//       ) : null}
// 			<input className="form-control" name="image"  type="file"
//         onChange={(e) => {setFile(e.target.files[0])}} 
//         id="image"/>
// 			<button className="btn btn-primary" 
//       onClick={()=> uploadImage()}
//       >Subir</button>

//     </form>
//   );
// };
// export default AddProduct
  <div className="add-product-container">
    <form onSubmit={formik.handleSubmit} className="add-product-form">
      <div className="form-group">
        <label htmlFor="name">Producto</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="form-control"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="cost">Costo</label>
        <input
          id="cost"
          name="cost"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cost}
          className="form-control"
        />
        {formik.touched.cost && formik.errors.cost ? (
          <div className="error">{formik.errors.cost}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="image">Imagen</label>
        <input
          className="form-control"
          name="image"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          id="image"
        />
      </div>

      <div className="form-buttons">
        <button
          type="button"
          className="btn btn-primary"
          onClick={uploadImage}
        >
          Subir
        </button>
      </div>
    </form>
  </div>
);
};

export default AddProduct;