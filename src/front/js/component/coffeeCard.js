import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function CoffeeCard({ name, price, handleClick, image }) {
    return (
        <Card sx={{ maxWidth: 345 }} onClick={() => handleClick(name, price)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={name}
                />
                <CardContent
                    sx={{
                        backgroundColor: 'lightgray',
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: 'black' }}>
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'black' }}>
                        {price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CoffeeCard;
