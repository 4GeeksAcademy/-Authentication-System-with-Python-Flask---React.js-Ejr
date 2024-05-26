import React, { useContext, useState } from 'react'; // Importa React, useContext y useState de React
import { Context } from '../store/appContext'; // Importa el contexto de la aplicación
import { Button, Modal, Form, Dropdown } from 'react-bootstrap'; // Importa componentes de react-bootstrap
import styles from './ProfileImageUpload.module.css'; // Importa los estilos CSS

const ProfileImageUpload = () => {
    const { store, actions } = useContext(Context); // Obtiene el estado y las acciones del contexto global
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
    const [file, setFile] = useState(null); // Estado para almacenar el archivo seleccionado
    const [modalAction, setModalAction] = useState(''); // Estado para controlar la acción del modal

    const handleShowModal = (action) => {
        setModalAction(action); // Establece la acción del modal (edit o upload)
        setShowModal(true); // Muestra el modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Oculta el modal
        setFile(null); // Resetea el archivo seleccionado
        setModalAction(''); // Resetea la acción del modal
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Establece el archivo seleccionado en el estado
    };

    const handleUpload = async () => {
        if (file) { // Verifica si hay un archivo seleccionado
            const formData = new FormData(); // Crea un objeto FormData para enviar el archivo
            formData.append('file', file); // Añade el archivo a FormData
            const result = await actions.uploadProfileImage(formData); // Llama a la acción para subir la imagen
            if (result.success) { // Verifica si la acción fue exitosa
                alert('Profile image uploaded successfully'); // Muestra un mensaje de éxito
                handleCloseModal(); // Cierra el modal
            } else {
                alert('Failed to upload profile image: ' + result.message); // Muestra un mensaje de error
            }
        } else {
            alert('Please select a file'); // Muestra un mensaje si no hay un archivo seleccionado
        }
    };

    const handleUpdate = async () => {
        if (file) { // Verifica si hay un archivo seleccionado
            const formData = new FormData(); // Crea un objeto FormData para enviar el archivo
            formData.append('file', file); // Añade el archivo a FormData
            const result = await actions.updateProfileImage(formData); // Llama a la acción para actualizar la imagen
            if (result.success) { // Verifica si la acción fue exitosa
                alert('Profile image updated successfully'); // Muestra un mensaje de éxito
                handleCloseModal(); // Cierra el modal
            } else {
                alert('Failed to update profile image: ' + result.message); // Muestra un mensaje de error
            }
        } else {
            alert('Please select a file'); // Muestra un mensaje si no hay un archivo seleccionado
        }
    };

    const handleDelete = async () => {
        const result = await actions.deleteProfileImage(); // Llama a la acción para eliminar la imagen
        if (result.success) { // Verifica si la acción fue exitosa
            alert('Profile image deleted successfully'); // Muestra un mensaje de éxito
            handleCloseModal(); // Cierra el modal
        } else {
            alert('Failed to delete profile image: ' + result.message); // Muestra un mensaje de error
        }
    };

    return (
        <div className={styles.profileImageContainer}> {/* Contenedor principal del componente */}
            {store.uploadedUserData && store.uploadedUserData.profile_image_url ? ( // Verifica si hay una imagen de perfil
                <>
                    <Dropdown> {/* Dropdown para acciones */}
                        <Dropdown.Toggle variant="primary" id="dropdown-basic"> {/* Botón de toggle del dropdown */}
                        edit photo
                        </Dropdown.Toggle>
                        <Dropdown.Menu> {/* Menú del dropdown */}
                            <Dropdown.Item onClick={() => handleShowModal('edit')}>Edit Profile Image</Dropdown.Item> {/* Opción para editar */}
                            <Dropdown.Item onClick={() => handleShowModal('upload')}>Upload Profile Image</Dropdown.Item> {/* Opción para subir */}
                            <Dropdown.Divider /> {/* Divisor del dropdown */}
                            <Dropdown.Item onClick={handleDelete}>Delete Profile Image</Dropdown.Item> {/* Opción para eliminar */}
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            ) : (
                <Button variant="primary" onClick={() => handleShowModal('upload')}>Upload Profile Image</Button> // Botón para subir imagen si no hay imagen de perfil
            )}
            <Modal show={showModal} onHide={handleCloseModal}> {/* Modal para subir/editar imagen */}
                <Modal.Header closeButton>
                    <Modal.Title>{modalAction === 'edit' ? 'Edit Profile Image' : 'Upload Profile Image'}</Modal.Title> {/* Título del modal */}
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Choose file</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} /> {/* Input para seleccionar archivo */}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button> {/* Botón para cerrar el modal */}
                    <Button variant="primary" onClick={modalAction === 'edit' ? handleUpdate : handleUpload}> {/* Botón para subir/editar imagen */}
                        {modalAction === 'edit' ? 'Update' : 'Upload'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProfileImageUpload; // Exporta el componente para su uso en otras partes de la aplicación
