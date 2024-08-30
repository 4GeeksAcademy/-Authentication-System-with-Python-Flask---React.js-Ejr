import React from 'react';
import { Button, Card } from 'react-bootstrap';

const OfferCard = ({ title, description, status, price, onEdit }) => {
    return (
        <Card style={{ width: '18rem', margin: '10px', backgroundColor: '#70879C' }}>
            <Card.Body>
                <Card.Title style={{color: 'black', fontWeight: 'bold' }}>{title}</Card.Title>
                <Card.Text style={{color: 'white'}}>{description}</Card.Text>
                <Card.Text style={{color: 'white'}}><strong>Precio:</strong> € {price}</Card.Text>
                <Card.Text style={{color: 'white'}}><strong>Estado:</strong> {status}</Card.Text>
                {status === 'Activo' ? (
                    <Button variant="primary">Postular</Button>
                ) : (
                    <Button variant="danger" disabled>Cerrado</Button>
                )}
                <Button variant="outline-success" onClick={onEdit} className="ml-2" style={{ marginLeft: '30px' }}>
                    Editar
                </Button>
            </Card.Body>
        </Card>
    );
};

export default OfferCard;

