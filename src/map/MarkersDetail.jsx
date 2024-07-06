import { Marker , Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector } from "react-redux";
import React from "react";
// import icon from "leaflet/dist/images/marker-icon.png";
import icon from "./../assets/icon/default.svg";
import "leaflet-rotatedmarker";

function MarkersDetail({ from, to, setMarker }) {
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
        position={[33.5498, 73.1305]}
        icon={DefaultIcon}
        //   eventHandlers={{
        //     click: (e) => {
        //       setMarker(coordinate.id);
        //     },
        //   }}
      >
        <Popup>
          <p></p>
        </Popup>
      </Marker>
    );
  }, [categories]);
  const markerComponentsOther = React.useMemo(() => {
    return (
      <Marker
        position={[33.5532, 73.1158]}
        icon={DefaultIcon}
        //   eventHandlers={{
        //     click: (e) => {
        //       setMarker(coordinate.id);
        //     },
        //   }}
      ><Popup>
      <p>Vehicle's front door is damaged</p>
    </Popup></Marker>
    );
  }, [categories]);
  return (
    <>
      {markerComponents}
      {markerComponentsOther}
    </>
  );
}

export default MarkersDetail;
