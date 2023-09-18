import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import * as filestack from 'filestack-js';

const Perfil = ()=>{
  const { store, actions } = useContext(Context);
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(
    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
  );
  const navigate = useNavigate()
  const filestackClient = filestack.init('ApcaRKG5TSEuvL2v2O2Dnz');
 // Manejar la selección de archivos y actualización de imagen de perfil
 const handleFileUpload = async () => {
  try {
    const result = await filestackClient.picker({ accept: 'image/*' }).open();
    if (result.filesUploaded.length > 0) {
      // Actualizar la imagen de perfil en el estado local
      const newProfileImage = result.filesUploaded[0].url;
      setProfileImage(newProfileImage);

      // Aquí puedes enviar la nueva URL de la imagen de perfil al servidor para actualizarla en la base de datos del usuario
      // actions.updateProfileImage(newProfileImage); // Debes implementar esta función en tus acciones
    }
  } catch (error) {
    console.error('Error al cargar la imagen:', error);
  }
};
  


  //cuando cargue llamamos a getuserinfo y enviamos la data al userData
  useEffect(()=>{
    if ((store.accessToken)){
      actions.getUserInfo().then(data=>setUserData(data))
      //{userData=="Ok"? JSON.stringify(store.userInfo):userData}
      //console.log("DESPLEGANDO DATA:", store.userInfo)
    } else {
      navigate("/cuenta")
    }
  }, [store.accessToken])

  const profileData = {...store.userInfo};
  
  const teamsData = [
    {
      teamName: 'Equipo juvenil',
      tournament: 'Colombia',
      registrationDate: '13/11/2023',
      cost: '$75',
    },
    {
      teamName: 'Equipo varonil 3',
      tournament: 'Las vegas',
      registrationDate: '13/11/2024',
      cost: '$50',
    },
    {
      teamName: 'Equipo campeones',
      tournament: 'Costa Rica',
      registrationDate: '13/11/2025',
      cost: '$80',
    }
  ];

    // Función para abrir el selector de archivos de Filestack
    const handleOpenFilePicker = () => {
      const pickerOptions = {
        fromSources: ['local_file_system', 'url', 'imagesearch', 'facebook', 'instagram', 'googledrive', 'dropbox'],
        accept: ['image/*'],
        maxSize: 1024 * 1024 * 5, // Tamaño máximo de 5 MB
        uploadInBackground: false, // Subir en primer plano
        transformations: {
          crop: true, // Permite recortar la imagen
        },
      };
  
      filestackClient.picker(pickerOptions).open().then(response => {
        // Handle the response from Filestack here
        console.log('Filestack response:', response);
        // Puedes obtener la URL de la imagen seleccionada desde response.filesUploaded[0].url
      }).catch(error => {
        console.error('Filestack error:', error);
      });
    };

  return (

    <section style={{ backgroundColor: '#eee' }}>
      <div className="contSuperior">
        <div className="row"></div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={profileImage}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px' }}
                />
                {/*<h5 className="my-3">{JSON.stringify(store.userInfo)}</h5>*/}
                <h5 className="my-3">{profileData.name}</h5>
                <p className="text-muted mb-1">Organizador</p>
                <p className="text-muted mb-4">{profileData.address}</p>
                <button type="button" className="btn btn-primary" onClick={handleOpenFilePicker}>
                  Cambiar imagen de perfil
                </button>
                <div className="d-flex justify-content-center mb-2">
                
                  <button type="button" className="btn btn-primary">
                    Configurar perfil
                  </button>
                  <Link to="/teams" className="btn btn-outline-primary ms-1">
                    Administrar eventos
                  </Link>
                </div>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-globe fa-lg text-warning"></i>
                    <p className="mb-0">https://mdbootstrap.com</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                    <p className="mb-0">@mdbootstrap</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Nombre completo</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profileData.name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profileData.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Télefono</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profileData.phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Dirección</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profileData.address}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Contraseña</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profileData.password}</p>
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <table className="table align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>Nombre del Evento</th>
                  <th>Torneo</th>
                  <th>Fecha de registro</th>
                  <th>Costo</th>
                </tr>
              </thead>
              <tbody>
                {teamsData.map((team, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                          alt=""
                          style={{ width: '45px', height: '45px' }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{team.teamName}</p>
                          <p className="text-muted mb-0">{team.tournament}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{team.tournament}</p>
                    </td>
                    <td>{team.registrationDate}</td>
                    <td>{team.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className='btn btn-outline-primary ms-1' onClick={() => actions.logout()}>
  Salir
</button>
          </div>
        
        </div>
      </div>
    </section>
  );
}

export default Perfil;
