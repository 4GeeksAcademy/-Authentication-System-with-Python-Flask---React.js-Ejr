import React, { useState } from "react";
import "../../styles/discover.css";
import Modal from "../component/discoverModal";
import AddEventModal from "../component/AddEventModal";

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false); 
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Blue Concert",
      image: "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg",
      description: "Prepárate para sumergirte en una experiencia musical inolvidable en el 'Blue Concert', donde la magia de la música se fusiona con la serenidad del color azul.",
      category: "Hip Hop",
    },
    {
      id: 2,
      title: "Urban Beats Festival",
      image: "https://images.pexels.com/photos/1537638/pexels-photo-1537638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Un festival que reúne a los mejores artistas de hip hop de la escena local e internacional.",
      category: "Hip Hop",
    },
    {
      id: 3,
      title: "Rap Battles Championship",
      image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Competición de freestyle rap donde los mejores MCs se enfrentan por el título de campeón.",
      category: "Hip Hop",
    },
    // Teatro
    {
      id: 4,
      title: "Teatro en el Parque",
      image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Disfruta de una tarde de teatro al aire libre en el corazón de la ciudad. Una experiencia cultural única para toda la familia.",
      category: "Teatro",
    },
    {
      id: 5,
      title: "Noche de Shakespeare",
      image: "https://images.pexels.com/photos/2378135/pexels-photo-2378135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Una velada dedicada a las obras más famosas del dramaturgo inglés William Shakespeare.",
      category: "Teatro",
    },
    {
      id: 6,
      title: "Musical Broadway",
      image: "https://images.pexels.com/photos/11323624/pexels-photo-11323624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Experimenta la magia de Broadway con este espectacular musical lleno de música y baile.",
      category: "Teatro",
    },
    // Salsa
    {
      id: 7,
      title: "Noche de Salsa",
      image: "https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Mueve tus caderas al ritmo de la salsa en esta noche llena de música, baile y diversión latina.",
      category: "Salsa",
    },
    {
      id: 8,
      title: "Salsa en la Playa",
      image: "https://images.pexels.com/photos/6900682/pexels-photo-6900682.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Baila salsa con los pies en la arena y disfruta de un atardecer caribeño.",
      category: "Salsa",
    },
    {
      id: 9,
      title: "Competencia de Salsa",
      image: "https://images.pexels.com/photos/3482523/pexels-photo-3482523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Las mejores parejas de baile compiten por el título de campeones de salsa.",
      category: "Salsa",
    },
    // Jazz
    {
      id: 10,
      title: "Festival de Jazz",
      image: "https://images.pexels.com/photos/1049690/pexels-photo-1049690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Sumérgete en las melodías suaves y los ritmos sincopados del jazz en este festival anual que reúne a los mejores músicos de la escena.",
      category: "Jazz",
    },
    {
      id: 11,
      title: "Jazz en el Sótano",
      image: "https://ideogram.ai/assets/progressive-image/balanced/response/Ah8eprTcTa6CjRdfEhabGA",
      description: "Experimenta el jazz en su ambiente más auténtico en este íntimo club subterráneo.",
      category: "Jazz",
    },
    {
      id: 12,
      title: "Big Band Night",
      image: "https://images.pexels.com/photos/442540/pexels-photo-442540.jpeg",
      description: "Revive la era dorada del swing con una noche de música big band en vivo.",
      category: "Jazz",
    },
    // Rock
    {
      id: 13,
      title: "Concierto de Rock",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Vive la energía del rock en vivo con algunas de las bandas más populares del momento en este concierto electrizante.",
      category: "Rock",
    },
    {
      id: 14,
      title: "Tributo a Queen",
      image: "https://images.pexels.com/photos/2747446/pexels-photo-2747446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Revive los éxitos de la legendaria banda Queen en este espectacular show tributo.",
      category: "Rock",
    },
    {
      id: 15,
      title: "Festival de Rock Indie",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Descubre las mejores bandas independientes en este festival que celebra el espíritu del rock alternativo.",
      category: "Rock",
    },
  ]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleOpenAddEventModal = () => {
    setIsAddEventModalOpen(true);
  };

  const handleCloseAddEventModal = () => {
    setIsAddEventModalOpen(false);
  };

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === "" || event.category === filter)
  );

  return (
    <div className="discover-container">
      <h1 className="discover-title">Descubre Eventos</h1>
      <div className="discover-search-and-filters">
        <input
          type="text"
          placeholder="Buscar eventos..."
          className="discover-search-bar"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="discover-filter-dropdown"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">Todos los eventos</option>
          {/* Añade más opciones según tus categorías */}
        </select>
        <button
          className="add-event-button"
          onClick={handleOpenAddEventModal}
        >
          +
        </button>
      </div>
      <div className="discover-gallery">
        <div className="discover-gallery-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="discover-gallery-item">
              <img
                src={event.image}
                alt={event.title}
                className="discover-gallery-item-image"
              />
              <div className="discover-gallery-item-content">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <button onClick={() => handleOpenModal(event)}>
                  Comprar Entradas
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        show={isModalOpen}
        event={selectedEvent}
        onClose={handleCloseModal}
      />
      <AddEventModal
        show={isAddEventModalOpen}
        onClose={handleCloseAddEventModal}
        addEvent={addEvent}
      />
    </div>
  );
};

export default Discover;
