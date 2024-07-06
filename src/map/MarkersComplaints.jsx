import { Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector } from "react-redux";
import React from "react";
// import icon from "leaflet/dist/images/marker-icon.png";
import icon from "./../assets/icon/default.svg";
import "leaflet-rotatedmarker";

function MarkersComplaints({ from, to, setMarker }) {
  const categories = useSelector((state) => state.categories.items);
  const DefaultIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: icon,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const markerComponents = React.useMemo(() => {
    return (
      <Marker
        rotationAngle={90}
        rotationOrigin='center center'
        position={[33.5498, 73.1305]}
        icon={DefaultIcon}
        //   eventHandlers={{
        //     click: (e) => {
        //       setMarker(coordinate.id);
        //     },
        //   }}
      ></Marker>
    );
  }, [categories]);
  return <>{markerComponents}</>;
}

export default MarkersComplaints;
