import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import MarkerClusterGroup from "react-leaflet-cluster";
import MarkersDetail from "./MarkersDetail";
import L from "leaflet";

function DetailMap({ fromDate, toDate, setMarker, zoom }) {
  return (
    <MapContainer center={zoom} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <MarkerClusterGroup chunkedLoading> */}
      <MarkersDetail from={fromDate} to={toDate} setMarker={setMarker} />
      <Circle
        center={[33.5532, 73.1158]}
        fillColor="red"
        color="red"
        radius={500}
      />
      {/* </MarkerClusterGroup> */}
    </MapContainer>
  );
}

export default DetailMap;
