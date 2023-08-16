// src/CustomMarkerIcon.js

import L from 'leaflet';

const CustomIcons = new L.Icon({
  iconUrl: 'path-to-your-icon-image.png', // Provide the path to your custom icon image
  iconSize: [32, 32], // Adjust the size of the icon
  iconAnchor: [16, 32], // Adjust the anchor point
  popupAnchor: [0, -32], // Adjust the popup anchor
});

export default CustomIcons;
