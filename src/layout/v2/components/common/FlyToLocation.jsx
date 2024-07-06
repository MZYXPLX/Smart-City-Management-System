import { useMap } from "react-leaflet";

const FlyToLocation = ({ target }) => {
    const map = useMap();
    map.flyTo(target, 15);
    return null;
  };

export default FlyToLocation