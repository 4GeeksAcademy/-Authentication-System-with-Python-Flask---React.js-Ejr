import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../store/appContext';
import { Form, Button } from 'react-bootstrap';

export const PhoneNumber = () => {
    const { store, actions } = useContext(Context);
    const [phone, setPhone] = useState('');

    useEffect(() => {
        // Al iniciar el componente, traer el número de teléfono desde la API
        actions.getPhoneNumber();
    }, []);

    useEffect(() => {
        // Cuando el número de teléfono del store cambia, actualizar el estado local
        if (store.phoneNumber) {
            setPhone(store.phoneNumber);
        }
    }, [store.phoneNumber]);

    const handleSave = async (e) => {
        e.preventDefault();
        if (!phone.trim()) {
            console.error("El número de teléfono no puede estar vacío.");
            return;
        }

        // Llamar a la acción que guarda el número de teléfono en el backend
        await actions.savePhoneNumber(phone);
    };

    return (
        <Form onSubmit={handleSave}>
            <Form.Group controlId="formPhoneNumber">
                <Form.Label>Número de Teléfono</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Introduce tu número de teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Guardar
            </Button>
        </Form>
    );
};
