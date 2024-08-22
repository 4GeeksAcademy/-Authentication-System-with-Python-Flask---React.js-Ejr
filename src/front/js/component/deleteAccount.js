import React from 'react';

const DeleteAccountLink = () => {
  const handleDeleteAccount = async (token) => {
    const confirmation = window.confirm(
      '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.'
    );

    if (confirmation) {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/delete-account/`, {

          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.ok) {
          // Cuenta eliminada exitosamente
          alert('Cuenta eliminada');
          // Aquí puedes redirigir al usuario, cerrar sesión, etc.
        } else {
          // Error al eliminar la cuenta
          const data = await response.json();
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al eliminar la cuenta');
      }
    }
  };

  return (
    <p>
      <a
        href="#"
        className="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        onClick={(e) => {
          e.preventDefault(); // Evita la recarga de la página
          handleDeleteAccount(localStorage.getItem('token')); // Llama a la función para borrar la cuenta
        }}
      >
        Borrar Cuenta
      </a>
    </p>
  );
};

export default DeleteAccountLink;
