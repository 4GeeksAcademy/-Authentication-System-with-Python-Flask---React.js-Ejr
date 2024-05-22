import React,{useContext, useState} from "react";
import { Context } from "../store/appContext";
import swal from 'sweetalert';
import { useNavigate} from "react-router-dom";
import "../../styles/index.css";
import imgFolder from "../../img/folder.png";
import { Container } from "reactstrap";
import Dropzone from "react-dropzone";
import { array } from "prop-types";
import axios from "axios";

export const AgregarForm = (props) => {
    
    const {actions} = useContext(Context)
    
    const [inputMarcayModelo, setInputMarcayModelo]=useState("");
    const [inputMatricula, setInputMatricula]=useState("");
    const [inputMotor, setInputMotor]=useState("");
    const [inputCambio, setInputCambio]=useState("");
    const [inputAsientos, setInputAsientos]=useState("");
    const [inputPrecio, setInputPrecio]=useState("");
    const [inputUrl_img1, setInputUrl_img1] = useState("");
    const [inputUrl_img2, setInputUrl_img2] = useState("");
    const [inputUrl_img3, setInputUrl_img3] = useState("");

    const [image, setImage] = useState({array: []})  //gracias a este useState({array...}) vamos a poder ver las 3 imágenes
    const [imageUrl, setImageUrls] = useState([]);  //mantengo la url de las img subidas
    const [loading, setLoading] = useState("");
    
    const handleDrop = (files) => {
        const uploaders = files.map((file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('tags', `codeinfuse, medium, gist`);
            formData.append('upload_preset', 'preset_FriendlyWheels');
            formData.append('api_key', '574539177956517');
            formData.append('timestamp', (Date.now() / 1000)| 0);
            setLoading("true")
            return axios
                .post('https://api.cloudinary.com/v1_1/dg1qrtyvd/image/upload', formData, {
                    headers: {"X-Requested-With": "XMLHttpRequest"},
                })
                .then((response) => {
                    const data = response.data
                    const imageurl = data.secure_url
                    let specificArrayInObject = image.array;
                    specificArrayInObject.push(imageurl);
                    const newObj = {...image, specificArrayInObject};
                    setImage(newObj);
                    setImageUrls(prevState => [...prevState, imageUrl]);
                    //console.log(image);
                })
        })
        axios.all(uploaders).then(() => {
            setLoading("false");
        })
    }

    function imagePreview() {       {/*si tenemos imagenes seleccionadas las mostrara y si no nada */}
        if(loading === "true") {
            return <h4>Cargando...</h4>
        }
        if(loading === "false") {
            return (<h4>
                {image.array.length <= 0
                ? "No tiene imágenes"
                : image.array.map((item) => (
                    <img alt="uploaded_image"
                    style={{width: "320px"}}
                    src={item}
                    />
                ))}   
            </h4>)
        }
    }
    // , height: "70px", backgroundSize: "cover", paddingRight:"15px"
    // const eliminarImagen = (indexImagen) => {
    //      const nuevasImagenes = [...image];
    //      nuevasImagenes.splice(indexImagen, 1);
    //      setImage(nuevasImagenes);
    //  };

    const navigate = useNavigate();
    

    async function handleSubmit(e) {
        e.preventDefault()
        let respuesta = await actions.addVehicle(inputMarcayModelo, inputMatricula.toUpperCase(), inputMotor, inputCambio, inputAsientos, inputPrecio, inputUrl_img1, inputUrl_img2, inputUrl_img3) 
        if (respuesta === "success"){
            swal ( "Vehículo añadido correctamente", ":)",  "success" )
             navigate("/");
        } else if (respuesta === "plate_exist") {
            swal ("El vehículo con esta matrícula ya ha sido añadido" , "Por favor inténtelo de nuevo",  "error" )
        } else {
            swal ( "Todos los campos son obligatorios" ,  "Por favor inténtelo de nuevo" ,  "error" )
        }
    };
    return (
        <div className="container lg-5">
            <h1 className="border-bottom pb-4 text-center">Ponga su vehículo en alquiler</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Marca y modelo del vehículo</h4>
                        <input type="text" className="form-control mb-3" id="exampleinputMarcayModelo" placeholder="Ingresa la marca y modelo del vehículo" name="marcaymodelo" onChange={(e) => setInputMarcayModelo(e.target.value)} />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Matrícula de vehículo</h4>
                        <input type="text" className="form-control mb-3" id="exampleinputMatricula" placeholder="Ingresa la matrícula del vehículo" name="matricula" onChange={(e) => setInputMatricula(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Tipo de motor</h4>
                        <input type="text" className="form-control mb-3" id="exampleinputMotor" placeholder="Ingresa el tipo de motor del vehículo" name="motor" onChange={(e) => setInputMotor(e.target.value)} />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Tipo de cambio</h4>
                        <input type="text" className="form-control mb-3" id="exampleinputCambio" placeholder="Ingresa el tipo de cambio del vehículo" name="cambio" onChange={(e) => setInputCambio(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Número de asientos</h4>
                        <input type="number" className="form-control mb-3" id="exampleinputAsientos" placeholder="Ingresa el número de asientos" name="asientos" onChange={(e) => setInputAsientos(e.target.value)} />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <h4 className="subtitulos">Precio por día</h4>
                        <input type="number" className="form-control mb-3" id="exampleinputPrecioDia" placeholder="Ingresa precio por día" name="precio" onChange={(e) => setInputPrecio(e.target.value)} />
                    </div>
                </div>
                <div>
                    <Container>
                    <h4 className="upload-img-text">Seleccione tres imágenes de su vehículo</h4>
                    <Dropzone className="dropzone"
                    onDrop={handleDrop}
                    onChange={(e) => setImage(e.target.value)}
                    value={image}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps({className:"dropzone"})}>
                                    <img className="logo" src={imgFolder} />
                                    <p>Seleccione o arrastre aquí sus imágenes </p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    {imagePreview()}
                    </Container>
                </div>
                {/* <button className="btn btn-outline-secondary" onClick={() => eliminarImagen(index)}> 
                Eliminar imagen </button> */}
                <div className="d-flex justify-content-center" id="btnAgregarForm">
                <button type="submit" className="btn btn-outline-success btn-lg border-2 mb-5 fs-4 justify-content-center">Añadir vehículo</button>
                </div>
            </form>
        </div>
    )
};
