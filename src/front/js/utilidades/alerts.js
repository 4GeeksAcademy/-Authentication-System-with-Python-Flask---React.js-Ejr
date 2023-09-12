import Swal from 'sweetalert2'

const showAlert = (iconType, message) => {

    Swal.fire({
        position: 'top-end',
        icon: iconType,
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}

export default showAlert