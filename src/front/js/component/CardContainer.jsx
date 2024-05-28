import React from 'react';
import CardComponent from './CardComponent.jsx';
import switchIcon from '../../img/switch.png';
import playstationIcon from '../../img/playstation.png';
import xboxIcon from '../../img/xbox.png';
import steamIcon from '../../img/steam.png';
import discordIcon from '../../img/discord.png';
import epicIcon from '../../img/epic.png';
import '../../styles/CardContainer.css';

const icons = [
  { icon: switchIcon, name: 'Switch' },
  { icon: playstationIcon, name: 'PlayStation' },
  { icon: xboxIcon, name: 'Xbox' },
  { icon: steamIcon, name: 'Steam' },
  { icon: discordIcon, name: 'Discord' },
  { icon: epicIcon, name: 'Epic' },
];

const CardContainer = ({ onInputChange }) => {
  return (
    <div className="card-container">
      {icons.map(({ icon, name }) => (
        <div key={name} className="card-column">
          <CardComponent icon={icon} platformName={name} onInputChange={onInputChange} />
        </div>
      ))}
    </div>
  );
};

export default CardContainer;
