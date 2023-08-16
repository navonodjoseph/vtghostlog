import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import PopupComponent from './PopupComponent'; // Import your custom popup component
import { Box, Heading, Text } from '@chakra-ui/react'
import Logo from './Logo';
import { Button } from '@chakra-ui/react';
import AddSightingModal from './AddSightingModal';

const ghostSightingsData = [
    { id: 1, latitude: 44.5588, longitude: -72.5778, date: '2023-08-15', description: 'Spooky encounter at midnight' },
    // Add more sightings here...
];

function GhostSightingsMap() {
    const [ghostSightings, setGhostSightings] = useState(ghostSightingsData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Inside the handleAddSighting function in GhostSightingsMap.js
const handleAddSighting = async (newSighting) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${newSighting.cityName}&format=json`);
      const data = await response.json();
  
      if (data.length > 0) {
        const { lat, lon } = data[0];
        newSighting.latitude = parseFloat(lat);
        newSighting.longitude = parseFloat(lon);
  
        setGhostSightings([...ghostSightings, newSighting]);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error geocoding:', error);
    }
  };
  
    return (
        <Box>
            <Box bg="primary" color="white" py="2" px="4">
                <Logo />
                <Button
                    colorScheme="purple"
                    onClick={() => setIsModalOpen(true)} // Open the modal when clicked
                    ml="auto"
                    display="block"
                >
                    Add Sighting
                </Button>
            </Box>
            <Box display="flex" p="4">
                <Box flex="1" p="2">
                    <MapContainer center={[44.0, -72.7]} zoom={9} style={{ width: '100%', height: '800px' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {ghostSightings.map((sighting) => (
                            <Marker
                                key={sighting.id}
                                position={[sighting.latitude, sighting.longitude]}
                            >
                                <PopupComponent sighting={sighting} />
                            </Marker>
                        ))}
                    </MapContainer>
                </Box>
                <Box flex="1" p="2" bg="background">
                    <Heading as="h2" size="lg" mb="4">
                        Ghost Sightings List
                    </Heading>
                    <ul>
                        {ghostSightings.map((sighting) => (
                            <li key={sighting.id}>
                                <Heading as='h3' size='md'>
                                    {sighting.date}
                                </Heading>
                                <Text>{sighting.description}</Text>
                            </li>
                        ))}
                    </ul>
                </Box>
            </Box>
            <AddSightingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddSighting={handleAddSighting} />
        </Box>
    );
}
export default GhostSightingsMap