import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';




function RegionCard({region, children, image}) {
    return (
      <Card sx={{ maxWidth: 345, border: '3px solid #2DB734', margin: '10px' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={region} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {region}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {children}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
}

export default RegionCard;