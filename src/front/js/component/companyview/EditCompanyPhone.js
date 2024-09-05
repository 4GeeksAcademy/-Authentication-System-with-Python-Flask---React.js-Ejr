import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../store/appContext';
import { Form, Button } from 'react-bootstrap';

export const PhoneNumber = () => {
    const { store, actions } = useContext(Context);
    const [phone, setPhone] = useState('');

    useEffect(() => {
        
        actions.getPhoneNumber();
    }, []);

    useEffect(() => {       
    
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
