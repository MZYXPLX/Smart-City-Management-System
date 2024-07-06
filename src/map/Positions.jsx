import { Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector } from "react-redux";
import React from "react";
// import icon from "leaflet/dist/images/marker-icon.png";
import icon from "./../assets/icon/download.svg";
import iconCar from "./../assets/icon/car-R.png";
import iconCarLeft from "./../assets/icon/car-L.png";
import iconBike from "./../assets/icon/bike-R.png";
import iconBikeLeft from "./../assets/icon/bike-L.png";
import iconOffroad from "./../assets/icon/offroad-R.png";
import iconOffroadLeft from "./../assets/icon/offroad-L.png";
import iconVan from "./../assets/icon/van-R.png";
import iconVanLeft from "./../assets/icon/van-L.png";
import iconPickup from "./../assets/icon/pickup-R.png";
import iconPickupLeft from "./../assets/icon/pickup-L.png";
import iconTruck from "./../assets/icon/truck-R.png";
import iconTruckLeft from "./../assets/icon/truck-L.png";
import iconBus from "./../assets/icon/bus-R.png";
import iconBusLeft from "./../assets/icon/bus-L.png";
import iconTractor from "./../assets/icon/tractor-R.png";
import iconTractorLeft from "./../assets/icon/tractor-L.png";
import moment from "moment";
import "leaflet-rotatedmarker";
function Positions({ from, to, setMarker, vehicle }) {
  const positions = useSelector((state) => state.session.positions);
  const devices = useSelector((state) => state.devices.items);

  const getDeviceCategory = (item) => {
    const key = Object.keys(devices).find(
      (key) => devices[key].positionId === item
    );
    return devices[key] ? devices[key].category : null;
  };

  const filtered = React.useMemo(() => {
    return positions.filter((item) =>
      vehicle.includes(item.id)
    );
  }, [positions, vehicle]);
  const DefaultIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: icon,
      iconSize: [21, 21],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);
  const customIconCar = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconCar,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconCarLeft = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconCarLeft,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconBike = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconBike,
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconBikeLeft = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconBikeLeft,
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconOffroad = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconOffroad,
      iconSize: [40, 40],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconOffroadLeft = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconOffroadLeft,
      iconSize: [40, 40],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconVan = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconVan,
      iconSize: [35, 35],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconVanLeft = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconVanLeft,
      iconSize: [35, 35],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconPickup = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconPickup,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconPickupLeft = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconPickupLeft,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconTruck = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconTruck,
      iconSize: [35, 35],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconTruckLeft = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconTruckLeft,
      iconSize: [35, 35],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconBus = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconBus,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconBusLeft = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconBusLeft,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconTractor = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconTractor,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconTractorLeft = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconTractorLeft,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);

  const getIcon = (itemType, itemCourse) => {
    if (itemType === "Car" && itemCourse <= 180) {
      return customIconCar;
    } else if(itemType === "Car" && itemCourse > 180) {
      return customIconCarLeft;
    }else if (itemType === "Motercycle" && itemCourse <= 180) {
      return customIconBike;
    } else if(itemType === "Motercycle" && itemCourse > 180) {
      return customIconBikeLeft;
    }else if (itemType === "Offroad" && itemCourse <= 180) {
      return customIconOffroad;
    } else if(itemType === "Offroad" && itemCourse > 180) {
      return customIconOffroadLeft;
    }else if (itemType === "Van" && itemCourse <= 180) {
      return customIconVan;
    } else if(itemType === "Van" && itemCourse > 180) {
      return customIconVanLeft;
    }else if (itemType === "Pickup" && itemCourse <= 180) {
      return customIconPickup;
    } else if(itemType === "Pickup" && itemCourse > 180) {
      return customIconPickupLeft;
    }else if (itemType === "Truck" && itemCourse <= 180) {
      return customIconTruck;
    } else if(itemType === "Truck" && itemCourse > 180) {
      return customIconTruckLeft;
    }else if (itemType === "Bus" && itemCourse <= 180) {
      return customIconBus;
    } else if(itemType === "Bus" && itemCourse > 180) {
      return customIconBusLeft;
    }else if (itemType === "Tractor" && itemCourse <= 180) {
      return customIconTractor;
    } else if(itemType === "Truck" && itemCourse > 180) {
      return customIconTractorLeft;
    }else{
      return DefaultIcon;
    }
  };
  const markerComponents = React.useMemo(() => {
    return filtered.map((coordinate) => {
      return (
        <Marker
          rotationAngle={coordinate.course}
          rotationOrigin={[coordinate.latitude, coordinate.longitude]}
          position={[coordinate.latitude, coordinate.longitude]}
          icon={
            getDeviceCategory(coordinate.id) === "Car"
              ? getIcon("Car", coordinate.course)
              : getDeviceCategory(coordinate.id) === "Motorcycle"
              ? getIcon("Motercycle", coordinate.course)
              : getDeviceCategory(coordinate.id) === "Offroad"
              ? getIcon("Offroad", coordinate.course)
              : getDeviceCategory(coordinate.id) === "Van"
              ? getIcon("Van", coordinate.course)
              : getDeviceCategory(coordinate.id) === "Pickup"
              ? getIcon("Pickup", coordinate.course)
              : getDeviceCategory(coordinate.id) === "Truck"
              ? getIcon("Truck", coordinate.course)
              : getDeviceCategory(coordinate.id) === "Bus"
              ? getIcon("Bus", coordinate.course)
              : getDeviceCategory(coordinate.id) === "Tractor"
              ? getIcon("Tractor", coordinate.course)
              : getIcon("Default", coordinate.course)
          }
          eventHandlers={{
            click: (e) => {
              setMarker(coordinate.id);
            },
          }}
        ></Marker>
      );
    });
  }, [
    filtered,
    setMarker,
    getDeviceCategory,
    customIconBike,
    DefaultIcon,
    customIconBus,
    customIconCar,
    customIconOffroad,
    customIconPickup,
    customIconTractor,
    customIconTruck,
    customIconVan,
  ]);
  return <>{markerComponents}</>;
}

export default Positions;
