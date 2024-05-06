import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function RegionCard({ region }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {region.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {region.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RegionCard;