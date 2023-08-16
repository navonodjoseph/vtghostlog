// src/AddSightingModal.js

import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

function AddSightingModal({ isOpen, onClose, onAddSighting }) {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [cityName, setCityName] = useState(''); // New state for city name

  const handleAddSighting = async () => {
    try {
      // Use a geocoding service to convert city name to latitude and longitude
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${cityName}&format=json`);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0]; // Get the display name from the geocoding response
        const newSighting = {
          id: Date.now(),
          date,
          description,
          cityName: display_name, // Store the display name (e.g., "City, State, Country") in the sighting
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        };

        onAddSighting(newSighting);

        setDate('');
        setDescription('');
        setCityName('');

        onClose();
      }
    } catch (error) {
      console.error('Error geocoding:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Sighting</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="4">
            <FormLabel>Date</FormLabel>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Description</FormLabel>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <FormControl mb="4">
          <FormLabel>City or Town Name</FormLabel>
          <Input value={cityName} onChange={(e) => setCityName(e.target.value)} />
        </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="purple" onClick={handleAddSighting}>
            Add Sighting
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddSightingModal;
