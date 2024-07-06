import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Positions from "./Positions";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useRef } from "react";
import { useSelector } from "react-redux";
function Map({ fromDate, toDate, setMarker, zoom, vehicle, cluster }) {
  const filterdata=useSelector((state)=>state.filter.filteredComplaints);

  const mapRef = useRef(null);
  return cluster ? (
    <MapContainer center={zoom} zoom={13} ref={mapRef}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup chunkedLoading>
        <Positions vehicle={vehicle} setMarker={setMarker} mapRef={mapRef} filterdata={filterdata}/>
      </MarkerClusterGroup>

    </MapContainer>
  ) : (
    <MapContainer center={zoom} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Positions vehicle={vehicle} setMarker={setMarker} filterdata={filterdata}/>
    </MapContainer>);
}

export default Map;
