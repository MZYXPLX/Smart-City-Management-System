import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import Positions from "./Positions";
import { useSelector } from "react-redux";

function Map({ zoom, complaint, cluster, mapType }) {
  const filterdata=useSelector((state)=>state.filter.filteredComplaints);


  return cluster ? (
    <MapContainer center={zoom} zoom={13}>
      <TileLayer url={mapType} />
      <MarkerClusterGroup chunkedLoading>
        <Positions complaint={complaint} filterdata={filterdata}/>
      </MarkerClusterGroup>

    </MapContainer>
  ) : (
    <MapContainer center={zoom} zoom={13}>
      <TileLayer url={mapType} />
      <Positions complaint={complaint} filterdata={filterdata}/>

    </MapContainer>
  );
}

export default Map;
