import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useGlobalPosition } from "../context/LocationContext";
import { userPositionIcon } from "../assets/userPositionIcon";
import { markerPositionIcon } from "../assets/markerPositionIcon";
import { getSearchLocation } from "../functions/getSearchLocation";

interface Position {
  lng: number;
  lat: number;
}

const Page: React.FC = () => {
  const { userPosition, setUserPosition } = useGlobalPosition();
  const [markerPosition, setMarkerPosition] = useState<Position | null>();
  const mapRef = useRef<L.Map | null>();
  const [query, setQuery] = useState("");

  const LocationMarkerPosition = ({
    setMarkerPosition,
  }: {
    setMarkerPosition: React.Dispatch<
      React.SetStateAction<Position | null | undefined>
    >;
  }) => {
    const map = useMap();

    useEffect(() => {
      mapRef.current = map;
    }, [map]);

    useMapEvents({
      click(e: L.LeafletMouseEvent) {
        const newPosition = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };
        setMarkerPosition(newPosition);
      },
    });
    return null;
  };

  const handleNewUserPosition = () => {
    markerPosition && setUserPosition(markerPosition);
    setMarkerPosition(null);
  };
  const handleSearchLocation = async () => {
    const { lat, lng } = await getSearchLocation(query);
    mapRef.current?.flyTo({ lat, lng }, 14);
  };

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-2 rounded flex-1 px-4 py-2"
        />
        <button
          onClick={handleSearchLocation}
          className="px-4 py-2 bg-blue-800 hover:bg-blue-700 rounded text-white"
        >
          Search
        </button>
      </div>
      <section className="w-1/2 h-[400px] mx-auto">
        <MapContainer
          center={userPosition}
          zoom={13}
          scrollWheelZoom={true}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarkerPosition setMarkerPosition={setMarkerPosition} />

          <Marker position={userPosition} icon={userPositionIcon}>
          </Marker>
          {markerPosition && (
            <Marker position={markerPosition} icon={markerPositionIcon}>
            </Marker>
          )}
        </MapContainer>
      </section>
      <button
        onClick={handleNewUserPosition}
        className="px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white"
      >
        Submit
      </button>
    </section>
  );
};

export default Page;
