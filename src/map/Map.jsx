import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import Positions from "./Positions";
import { useEffect } from "react";
import './Map.css';
function Map({ fromDate, toDate, setMarker, zoom,vehicle }) {

  return (
    <MapContainer center={zoom} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup chunkedLoading>
        <Positions vehicle={vehicle} from={fromDate} to={toDate} setMarker={setMarker} />
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default Map;
