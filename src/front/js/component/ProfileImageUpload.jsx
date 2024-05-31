import React, { useContext, useState } from 'react'; // Importa React, useContext y useState de React
import { Context } from '../store/appContext'; // Importa el contexto de la aplicación
import { Button, Modal, Form, Dropdown, Alert } from 'react-bootstrap'; // Importa componentes de react-bootstrap
import styles from './ProfileImageUpload.module.css'; // Importa los estilos CSS

const ProfileImageUpload = () => {
    const { store, actions } = useContext(Context); // Obtiene el estado y las acciones del contexto global
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
    const [file, setFile] = useState(null); // Estado para almacenar el archivo seleccionado
    const [modalAction, setModalAction] = useState(''); // Estado para controlar la acción del modal
    const [resultModalVisible, setResultModalVisible] = useState(false); // Estado para controlar la visibilidad del modal de resultado
    const [resultModalMessage, setResultModalMessage] = useState(''); // Estado para almacenar el mensaje del modal de resultado

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

    const handleResultModalClose = () => {
        setResultModalVisible(false); // Oculta el modal de resultado
    };

    const handleUpload = async () => {
        if (file) { // Verifica si hay un archivo seleccionado
            const formData = new FormData(); // Crea un objeto FormData para enviar el archivo
            formData.append('file', file); // Añade el archivo a FormData
            const result = await actions.uploadProfileImage(formData); // Llama a la acción para subir la imagen
            if (result.success) { // Verifica si la acción fue exitosa
                setResultModalMessage('Profile image uploaded successfully'); // Muestra un mensaje de éxito
                setResultModalVisible(true); // Muestra el modal de resultado
                handleCloseModal(); // Cierra el modal de subida de imagen
            } else {
                setResultModalMessage('Failed to upload profile image: ' + result.message); // Muestra un mensaje de error
                setResultModalVisible(true); // Muestra el modal de resultado
            }
        } else {
            setResultModalMessage('Please select a file'); // Muestra un mensaje si no hay un archivo seleccionado
            setResultModalVisible(true); // Muestra el modal de resultado
        }
    };

    const handleUpdate = async () => {
        if (file) { // Verifica si hay un archivo seleccionado
            const formData = new FormData(); // Crea un objeto FormData para enviar el archivo
            formData.append('file', file); // Añade el archivo a FormData
            const result = await actions.updateProfileImage(formData); // Llama a la acción para actualizar la imagen
            if (result.success) { // Verifica si la acción fue exitosa
                setResultModalMessage('Profile image updated successfully'); // Muestra un mensaje de éxito
                setResultModalVisible(true); // Muestra el modal de resultado
                handleCloseModal(); // Cierra el modal de subida de imagen
            } else {
                setResultModalMessage('Failed to update profile image: ' + result.message); // Muestra un mensaje de error
                setResultModalVisible(true); // Muestra el modal de resultado
            }
        } else {
            setResultModalMessage('Please select a file'); // Muestra un mensaje si no hay un archivo seleccionado
            setResultModalVisible(true); // Muestra el modal de resultado
        }
    };

    const handleDelete = async () => {
        const result = await actions.deleteProfileImage(); // Llama a la acción para eliminar la imagen
        if (result.success) { // Verifica si la acción fue exitosa
            setResultModalMessage('Profile image deleted successfully'); // Muestra un mensaje de éxito
            setResultModalVisible(true); // Muestra el modal de resultado
            handleCloseModal(); // Cierra el modal de subida de imagen
        } else {
            setResultModalMessage('Failed to delete profile image: ' + result.message); // Muestra un mensaje de error
            setResultModalVisible(true); // Muestra el modal de resultado
        }
    };

    return (
        <div className={styles.profileImageContainer}> {/* Contenedor principal del componente */}
            {store.uploadedUserData && store.uploadedUserData.profile_image_url ? ( // Verifica si hay una imagen de perfil
                <>
                    <Dropdown> {/* Dropdown para acciones */}
                        <Dropdown.Toggle className={styles.editButton} id="dropdown-basic" title='Edit photo'> {/* Botón de toggle del dropdown */}
                        <i class="fa-solid fa-image"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.dropdownMenu}> {/* Menú del dropdown */}
                            <Dropdown.Item className={styles.dropdownItem} onClick={() => handleShowModal('edit')}>Edit Image</Dropdown.Item> {/* Opción para subir */}
                            <Dropdown.Item className={styles.dropdownItem} onClick={() => handleShowModal('upload')}>Upload Image</Dropdown.Item> {/* Opción para subir */}
                            <Dropdown.Divider /> {/* Divisor del dropdown */}
                            <Dropdown.Item className={styles.dropdownItem} onClick={handleDelete}>Delete Image</Dropdown.Item> {/* Opción para eliminar */}
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            ) : (
                <Button className={styles.editButton} onClick={() => handleShowModal('upload')}>Upload Image</Button> // Botón para subir imagen si no hay imagen de perfil
            )}
            <Modal show={showModal} onHide={handleCloseModal}> {/* Modal para subir/editar imagen */}
            <div className={styles.modalProfile}>
                <Modal.Header className={styles.modalHeader}>
                    <Modal.Title>{modalAction === 'edit' ? 'Edit Profile Image' : 'Upload Profile Image'}</Modal.Title> {/* Título del modal */}
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Choose file</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} /> {/* Input para seleccionar archivo */}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    <Button className={styles.editButton} onClick={handleCloseModal}>Close</Button> {/* Botón para cerrar el modal */}
                    <Button className={styles.editButton} onClick={modalAction === 'edit' ? handleUpdate : handleUpload}> {/* Botón para subir/editar imagen */}
                        {modalAction === 'edit' ? 'Update' : 'Upload'}
                    </Button>
                </Modal.Footer>
            </div>
            </Modal>
            <Modal show={resultModalVisible} onHide={handleResultModalClose}> {/* Modal para mostrar mensajes de resultado */}
                <div className={styles.modalProfile}>
                <Modal.Header className={styles.modalHeader}>
                    <Modal.Title>Result</Modal.Title> {/* Título del modal */}
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <p>{resultModalMessage}</p> {/* Mensaje del modal */}
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    <Button className={styles.editButton} onClick={handleResultModalClose}>Close</Button> {/* Botón para cerrar el modal */}
                </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
};

export default ProfileImageUpload; // Exporta el componente para su uso en otras partes de la aplicación
