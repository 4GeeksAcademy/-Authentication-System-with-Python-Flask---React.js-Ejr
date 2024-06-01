import React, { useState, useContext, useEffect } from 'react'; // Importa React y los hooks useState, useContext, y useEffect
import { Modal, Button, Form, DropdownButton, Dropdown, Alert } from 'react-bootstrap'; // Importa componentes de react-bootstrap
import { Context } from '../store/appContext'; // Importa el contexto de la aplicación
import styles from "./MembershipPurchase.module.css"; // Importa los estilos CSS

const MembershipPurchase = () => {
    const { store, actions } = useContext(Context); // Obtiene el estado y las acciones del contexto global
    const [showSelectionModal, setShowSelectionModal] = useState(false); // Estado para controlar la visibilidad del modal de selección de membresía
    const [selectedMembership, setSelectedMembership] = useState(null); // Estado para almacenar la membresía seleccionada
    const [paymentMethod, setPaymentMethod] = useState(''); // Estado para almacenar el método de pago seleccionado
    const [creditCardDetails, setCreditCardDetails] = useState({ // Estado para almacenar los detalles de la tarjeta de crédito
        cardNumber: '',
        cardHolderName: '',
        expirationDate: '',
        cvv: '',
        cardType: ''
    });
    const [processing, setProcessing] = useState(false); // Estado para indicar si el pago se está procesando
    const [purchaseResult, setPurchaseResult] = useState(null); // Estado para almacenar el resultado de la compra
    const [showResultModal, setShowResultModal] = useState(false); // Estado para controlar la visibilidad del modal de resultado

    useEffect(() => { // Hook useEffect para cargar las membresías cuando el componente se monta
        actions.loadMemberships(); // Llama a la acción para cargar las membresías
    }, []);

    const handleBuyClick = () => { // Función para manejar el clic en el botón de compra
        if (store.uploadedUserData.active_membership_is_active !== "No Activa") { // Verifica si el usuario ya tiene una membresía activa
            setPurchaseResult({ success: false, error: 'You already have an active membership!' }); // Establece el resultado de la compra
            setShowResultModal(true); // Muestra el modal de resultado
        } else {
            setShowSelectionModal(true); // Muestra el modal de selección de membresía
        }
    };

    const handleMembershipSelect = (membership) => { // Función para manejar la selección de una membresía
        setSelectedMembership(membership); // Establece la membresía seleccionada
        setShowSelectionModal(false); // Oculta el modal de selección de membresía
    };

    const handleInputChange = (event) => { // Función para manejar los cambios en los campos de entrada de la tarjeta de crédito
        setCreditCardDetails({
            ...creditCardDetails,
            [event.target.name]: event.target.value // Actualiza el estado de los detalles de la tarjeta de crédito
        });
    };

    const handleFormSubmit = async (event) => { // Función para manejar el envío del formulario de pago
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario

        if (!paymentMethod) { // Verifica si no se ha seleccionado un método de pago
            setPurchaseResult({ success: false, error: 'Please select a payment method.' }); // Establece el resultado de la compra
            setShowResultModal(true); // Muestra el modal de resultado
            return;
        }

        if (paymentMethod === 'paypal') { // Verifica si el método de pago es PayPal
            const paymentData = {
                membership_id: selectedMembership.id,
                amount: selectedMembership.price,
                currency: 'USD'  // Ajusta la moneda si es necesario
            };

            const result = await actions.initiatePaypalPayment(paymentData); // Llama a la acción para iniciar el pago con PayPal

            if (result.success) { // Verifica si el pago con PayPal fue exitoso
                window.location.href = result.data.approval_url; // Redirige al usuario a la URL de aprobación de PayPal
            } else {
                setPurchaseResult(result); // Establece el resultado de la compra
                setShowResultModal(true); // Muestra el modal de resultado
            }
            return;
        }

        if (paymentMethod !== 'cash' && (!creditCardDetails.cardNumber || !creditCardDetails.expirationDate || !creditCardDetails.cvv || !creditCardDetails.cardType)) { // Verifica si faltan detalles de la tarjeta de crédito
            setPurchaseResult({ success: false, error: 'Please complete all payment details.' }); // Establece el resultado de la compra
            setShowResultModal(true); // Muestra el modal de resultado
            return;
        }

        setProcessing(true); // Establece el estado de procesamiento a true

        const paymentData = {
            amount: selectedMembership.price,
            payment_method: paymentMethod,
            ...(paymentMethod !== 'cash' && {
                card_number: creditCardDetails.cardNumber,
                cardholder_name: creditCardDetails.cardHolderName,
                expiration_date: creditCardDetails.expirationDate,
                cvv: creditCardDetails.cvv,
                card_type: creditCardDetails.cardType
            })
        };

        const result = await actions.purchaseMembership({ membership_id: selectedMembership.id, payment_data: paymentData }); // Llama a la acción para comprar la membresía

        setPurchaseResult(result); // Establece el resultado de la compra
        setShowResultModal(true); // Muestra el modal de resultado
        setProcessing(false); // Establece el estado de procesamiento a false
    };

    const renderCreditCardForm = () => ( // Función para renderizar el formulario de la tarjeta de crédito
        <>
            <Form.Group>
                <Form.Label>Card Holder Name</Form.Label>
                <Form.Control type="text" placeholder="Card Holder Name" name="cardHolderName" value={creditCardDetails.cardHolderName} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" placeholder="Card Number" name="cardNumber" value={creditCardDetails.cardNumber} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Card Type</Form.Label>
                <div key={`inline-radio`} className="mb-3">
                    <Form.Check inline label={<i className="fa-brands fa-cc-visa"></i>} name="cardType" type="radio" id={`visa`} value="visa" checked={creditCardDetails.cardType === 'visa'} onChange={handleInputChange} required />
                    <Form.Check inline label={<i className="fa-brands fa-cc-mastercard"></i>} name="cardType" type="radio" id={`mastercard`} value="mastercard" checked={creditCardDetails.cardType === 'mastercard'} onChange={handleInputChange} required />
                    <Form.Check inline label={<i className="fa-brands fa-cc-amex"></i>} name="cardType" type="radio" id={`amex`} value="amex" checked={creditCardDetails.cardType === 'amex'} onChange={handleInputChange} required />
                </div>
            </Form.Group>
            <Form.Group>
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control type="text" placeholder="MM/YY" name="expirationDate" value={creditCardDetails.expirationDate} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>CVV</Form.Label>
                <Form.Control type="text" placeholder="CVV" name="cvv" value={creditCardDetails.cvv} onChange={handleInputChange} required />
            </Form.Group>
        </>
    );

    return (
        <>
            <Button className={styles.buttonBuy} onClick={handleBuyClick} title='Buy Membership'><i class="fa-solid fa-cart-shopping"></i></Button> {/* Botón para iniciar el proceso de compra */}
            {showSelectionModal && (
                <Modal show={true} onHide={() => setShowSelectionModal(false)} className={styles.modal}>
                    <Modal.Header closeButton className={styles.modalHeader}>
                        <Modal.Title>Select Membership</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={styles.modalBody}>
                        {store.memberships.map(membership => (
                            <p key={membership.id} className={styles.membershipItem} onClick={() => handleMembershipSelect(membership)}>
                                {membership.name} - ${membership.price}
                            </p>
                        ))}
                    </Modal.Body>
                </Modal>
            )}
            {selectedMembership && (
                <Modal show={true} onHide={() => setSelectedMembership(null)} className={styles.modal}>
                    <Modal.Header closeButton className={styles.modalHeader}>
                        <Modal.Title>Payment Checkout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={styles.modalBody}>
                        <Form onSubmit={handleFormSubmit}>
                        <Form.Group>
                                <Form.Label>Payment Method</Form.Label>
                                <DropdownButton id="dropdown-payment-method" title={paymentMethod || 'Select Method'} className={styles.paymentMethodDropdown}>
                                    <Dropdown.Item onClick={() => setPaymentMethod('credit_card')}><i className="fa-solid fa-credit-card"></i> Credit Card</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setPaymentMethod('debit_card')}><i className="fa-solid fa-credit-card"></i> Debit Card</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setPaymentMethod('paypal')}><i className="fa-brands fa-paypal"></i> PayPal</Dropdown.Item>
                                    {['admin', 'master'].includes(localStorage.getItem('dataRole')) && (
                                        <Dropdown.Item onClick={() => setPaymentMethod('cash')}>
                                            <i className="fa-regular fa-money-bill-1"></i> Cash
                                        </Dropdown.Item>
                                    )}
                                </DropdownButton>
                            </Form.Group>
                            {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && renderCreditCardForm()}
                            <Button type="submit" disabled={processing} className={styles.buttonSubmit}>
                                {processing ? 'Processing...' : 'Confirm Purchase'}
                            </Button>
                        </Form>
                        


                    </Modal.Body>
                </Modal>
            )}
            {showResultModal && (
                <Modal show={true} onHide={() => setShowResultModal(false)} className={styles.modal}>
                    <Modal.Header closeButton className={styles.modalHeader}>
                        <Modal.Title>Purchase {purchaseResult?.success ? 'Successful' : 'Failed'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={styles.modalBody}>
                        {purchaseResult?.success ? (
                            <Alert variant="success">
                                Your purchase was successful!
                            </Alert>
                        ) : (
                            <Alert variant="danger">
                                {purchaseResult?.error || 'There was an error processing your purchase.'}
                            </Alert>
                        )}
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

export default MembershipPurchase;
