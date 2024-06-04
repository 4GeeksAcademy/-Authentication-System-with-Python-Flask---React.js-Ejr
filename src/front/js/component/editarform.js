import React, { useContext, useState} from "react";
import { Context } from "../store/appContext";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../../styles/index.css";
import imgFolder from "../../img/folder.png";
import { Container } from "reactstrap";
import Dropzone from "react-dropzone";
import axios from "axios";

export const EditarForm = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [image, setImage] = useState({ array: [props.url_img1, props.url_img2, props.url_img3] });
    const [loading, setLoading] = useState("");

    const handleDrop = (files) => {
        const uploaders = files.map((file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('tags', `codeinfuse, medium, gist`);
            formData.append('upload_preset', 'preset_FriendlyWheels');
            formData.append('api_key', '574539177956517');
            formData.append('timestamp', (Date.now() / 1000) | 0);
            setLoading("true")
            return axios
                .post('https://api.cloudinary.com/v1_1/dg1qrtyvd/image/upload', formData, {
                    headers: { "X-Requested-With": "XMLHttpRequest" },
                })
                .then((response) => {
                    const data = response.data
                    const imageUrl = data.secure_url
                    setImage(prevState => ({
                        ...prevState, array: [...prevState.array, imageUrl].slice(0, 3)
                    }));
                });
        });
        axios.all(uploaders).then(() => {
            setLoading("false");
        })
    }

    const eliminarImagen = (item) => {
        const nuevasImagenes = image.array.filter((img) => {
            return img != item
        })
        setImage({ array: nuevasImagenes });
    };

    function imagePreview() {
        if (loading === "true") {
            return <h5>Cargando...</h5>
        }
        if (loading === "false") {
            return (<h6>
                {image.array.length <= 0
                    ? "No tiene imágenes"
                    : image.array.map((item, index) => (
                        <>
                            <img key={index} alt="uploaded_image"
                                style={{ "maxWidth": "50%" }}
                                src={item}
                            />
                            <div onClick={() => {
                                eliminarImagen(item)
                            }
                            }>
                                <button className="btn btn-outline-secondary" style={{ margin: "auto" }}> Eliminar imagen </button>
                            </div>
                        </>
                    ))}
            </h6>)
        }
    };
    
    const formik = useFormik({
        initialValues: {
            inputMarcayModelo: props.marca_modelo,
            inputMatricula: props.matricula,
            inputMotor: props.motor,
            inputCambio: props.tipo_cambio,
            inputAsientos: props.asientos,
            inputPrecio: props.precio
        },
        validationSchema: Yup.object({
            inputMarcayModelo: Yup.string().min(8, 'La marca o modelo debe tener mínimo 8 carácteres').required('Campo obligatorio'),
            inputMatricula: Yup.string().matches(/^\S*$/, 'No se permiten espacios en la matrícula').max(7, 'Debe tener 7 caracteres máximo').required('Campo obligatorio'),
            inputMotor: Yup.string().min(5, 'Este espacio debe contener mínimo 5 carácteres').required('Campo obligatorio'),
            inputCambio: Yup.string().min(5, 'Este espacio debe contener mínimo 5 carácteres').required('Campo obligatorio'),
            inputAsientos: Yup.number().min(2, 'El vehículo debe tener mínimo 2 asientos').required('Campo obligatorio'),
            inputPrecio: Yup.number().min(1, 'El precio de su alquiler debe ser mayor a 0').required('Campo obligatorio'),
        }),
        
        onSubmit: async values => {
            async function handleSubmit() {   
                if (image.array.length !== 3) {
                swal("Debe subir tres imágenes del vehículo", "Por favor inténtelo de nuevo", "error");
                return;
                }
                const [url_img1, url_img2, url_img3] = image.array;
                console.log(image.array);
                let respuesta = await actions.updateOneVehicle(values.inputMarcayModelo, values.inputMatricula.replaceAll(" ", "").toUpperCase(), values.inputMotor, values.inputCambio, values.inputAsientos, values.inputPrecio, store.details.id,url_img1, url_img2, url_img3);
                if (respuesta === "success") {
                    swal("Vehículo editado correctamente", "", "success")
                    navigate("/");
                } else if (respuesta === "plate_exist") {
                    swal("El vehículo con esta matrícula ya ha sido añadido", "Por favor inténtelo de nuevo", "error")
                }
            }
            handleSubmit();
        },
    });

    return (
        <div className="container lg-5">
            <h1 className="border-bottom pb-4 text-success text-center"><strong>EDITE SU COCHE </strong></h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Marca y modelo del vehículo</h4>
                        <input type="text" className="form-control mb-3" id="inputMarcayModelo" placeholder="Ingresa la marca y modelo del vehículo" name="inputMarcayModelo" onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.inputMarcayModelo}
                        />
                        {formik.touched.inputMarcayModelo && formik.errors.inputMarcayModelo ? (
                            <div className="text-danger">{formik.errors.inputMarcayModelo}</div>
                        ) : null}
                    </div>
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Matrícula de vehículo</h4>
                        <input type="text" className="form-control mb-3" id="inputMatricula" placeholder="Ingresa la matrícula del vehículo, ej.:1234ABC" name="inputMatricula" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.inputMatricula}
                        />
                        {formik.touched.inputMatricula && formik.errors.inputMatricula ? (
                        <div className="text-danger">{formik.errors.inputMatricula}</div>
                    ) : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Tipo de motor</h4>
                        <input type="text" className="form-control mb-3" id="inputMotor" placeholder="Ingresa el tipo de motor del vehículo" name="inputMotor" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.inputMotor}
                        />
                        {formik.touched.inputMotor && formik.errors.inputMotor ? (
                        <div className="text-danger">{formik.errors.inputMotor}</div>
                    ) : null}
                    </div>
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Tipo de cambio</h4>
                        <input type="text" className="form-control mb-3" id="inputCambio" placeholder="Ingresa el tipo de cambio del vehículo" name="inputCambio" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.inputCambio}
                        />
                        {formik.touched.inputCambio && formik.errors.inputCambio ? (
                        <div className="text-danger">{formik.errors.inputCambio}</div>
                    ) : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Número de asientos</h4>
                        <input type="number" className="form-control mb-3" id="inputAsientos" placeholder="Ingresa el número de asientos" name="inputAsientos" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.inputAsientos}
                        />
                        {formik.touched.inputAsientos && formik.errors.inputAsientos ? (
                        <div className="text-danger">{formik.errors.inputAsientos}</div>
                    ) : null}
                    </div>
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Precio por día</h4>
                        <input type="number" className="form-control mb-3" id="inputPrecio" placeholder="Ingresa precio por día" name="inputPrecio" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.inputPrecio}
                        />
                        {formik.touched.inputPrecio && formik.errors.inputPrecio ? (
                        <div className="text-danger">{formik.errors.inputPrecio}</div>
                    ) : null}
                    </div>
                </div>
                <div>
                    <Container>
                        <h4 className="upload-img-text">Si quiere editar sus fotos actuales, seleccione tres imágenes nuevas de su coche</h4>
                        <Dropzone className="dropzone"
                            onDrop={handleDrop}
                            onChange={(e) => setImage(e.target.value)}
                            value={image}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps({ className: "dropzone" })}>
                                        <img className="logo" src={imgFolder} />
                                        <p>Seleccione o arrastre aquí sus imágenes </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        {imagePreview()}
                    </Container>
                </div>
                <div className="d-flex justify-content-center" id="btnAgregarForm">
                    <button type="submit" className="btn-success btn-lg border-2 mb-5 fs-4 justify-content-center">Guardar cambios</button>
                </div>
            </form>
        </div>
    )
};