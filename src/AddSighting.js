import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Textarea, Box } from '@chakra-ui/react';

function AddSightingForm({ onAddSighting }) {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleAddSighting = () => {
    // Create a new ghost sighting object
    const newSighting = {
      id: Date.now(), // Generate a unique ID (timestamp)
      date,
      description,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    // Call the onAddSighting function to pass the new sighting data
    onAddSighting(newSighting);

    // Clear the form fields
    setDate('');
    setDescription('');
    setLatitude('');
    setLongitude('');
  };

  return (
    <Box>
      <FormControl mb="4">
        <FormLabel>Date</FormLabel>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Description</FormLabel>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Latitude</FormLabel>
        <Input type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Longitude</FormLabel>
        <Input type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
      </FormControl>
      <Button colorScheme="purple" onClick={handleAddSighting}>
        Add Sighting
      </Button>
    </Box>
  );
}

export default AddSightingForm;