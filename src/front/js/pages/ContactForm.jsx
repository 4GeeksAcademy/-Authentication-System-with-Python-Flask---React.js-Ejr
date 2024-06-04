import React, { useState } from 'react'; // Import React and useState hook
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button components from react-bootstrap
import './ContactForm.css'; // Import CSS for the component
import bg from "../../img/man.jpg"; // Import a background image

const ContactForm = () => {
    // useState hook to manage form data state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    // useState hook to manage modal message state
    const [modalMessage, setModalMessage] = useState('');
    // useState hook to manage modal visibility state
    const [showModal, setShowModal] = useState(false);

    // Event handler for form input changes
    const handleChange = e => {
        const { name, value } = e.target; // Destructure name and value from event target
        setFormData(prevState => ({
            ...prevState,
            [name]: value // Update the value for the specific field
        }));
    };

    // Function to validate form data
    const validateForm = () => {
        // Check if any field is empty
        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
            setModalMessage('All fields are required.');
            setShowModal(true); // Show error modal
            return false;
        }
        // Regex to validate email format
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setModalMessage('Please enter a valid email address.');
            setShowModal(true); // Show error modal
            return false;
        }
        return true; // Return true if all validations pass
    };

    // Event handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (!validateForm()) return; // Validate form and exit if invalid

        // Construct the API URL from environment variables
        const url = `${process.env.BACKEND_URL}/api/contact`;
        try {
            // Send a POST request to the server with form data
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            // Clear form data after successful submission
            setFormData({ firstName: '', lastName: '', email: '' });

            if (response.ok) { // If response is OK, parse the JSON data
                const data = await response.json();
                setModalMessage('Thank you for contacting us! We will be in touch soon.');
                setShowModal(true); // Show success modal
            } else { // If response is not OK, parse the error data
                // const errorData = await response.json();
                setModalMessage('Failed to send your contact request. Please try again.');
                setShowModal(true); // Show error modal
            }
        } catch (error) { // Handle network or other errors
            // console.error('Failed to send contact data:', error);
            setModalMessage('An error occurred. Please try again.');
            setShowModal(true); // Show error modal
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };

    // JSX to render the form and modal
    return (
        <div className="contact-form-container" style={{ backgroundImage: `url(${bg})` }}>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className='form'>
                    <h1>CONTACT US</h1>
                    <div className="form-group">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Subscribe</button>
                </form>
                <Modal show={showModal} onHide={closeModal}>
                    <Modal.Header >
                        <Modal.Title>Contact Us Response</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default ContactForm;