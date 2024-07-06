import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import MarkerClusterGroup from "react-leaflet-cluster";
import MarkersComplaints from "./MarkersComplaints";

function ComplaintsMap({ fromDate, toDate, setMarker, zoom }) {
 
  return (
    <MapContainer center={zoom} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <MarkerClusterGroup chunkedLoading> */}
      <MarkersComplaints from={fromDate} to={toDate} setMarker={setMarker} />
      {/* </MarkerClusterGroup> */}
    </MapContainer>
  );
}

export default ComplaintsMap;
