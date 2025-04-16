import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 39.8283,
  lng: -98.5795,
};

const stateCoords = {
  AZ: { lat: 34.0489, lng: -111.0937 },
  TX: { lat: 31.9686, lng: -99.9018 },
  CO: { lat: 39.5501, lng: -105.7821 },
  NY: { lat: 43.0000, lng: -75.0000 },
  CA: { lat: 36.7783, lng: -119.4179 },
  FL: { lat: 27.9944, lng: -81.7603 },
  WA: { lat: 47.7511, lng: -120.7401 },
  NV: { lat: 38.8026, lng: -116.4194 },
};

const MapView = ({ quotes }) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const onMapLoad = () => {
    setMapLoaded(true);
  };

  useEffect(() => {
    if (mapLoaded && window.google?.maps) {
      const points = quotes
        .map(q => {
          const state = q.state?.trim().toUpperCase();
          const loc = stateCoords[state];
          return loc ? new window.google.maps.LatLng(loc.lat, loc.lng) : null;
        })
        .filter(Boolean);
      console.log("Heatmap Data:", points);
      setHeatmapData(points);
    }
  }, [mapLoaded, quotes]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyB9-8y9QHoJE-ciCncjHQGbmYjQw6L_hbU"
      // googleMapsApiKey={`${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`}
      libraries={['visualization']}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={onMapLoad}
      >
        {heatmapData.length > 0 && (
          <HeatmapLayer
            data={heatmapData}
            options={{ radius: 30, opacity: 0.7 }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
