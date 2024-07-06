import {
  Marker,
  Popup,
  useMap,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
// import icon from "leaflet/dist/images/marker-icon.png";
import icon from "./../../../../assets/icon/default.svg";
import iconCar from "./../../../../assets/icon/car.svg";
import iconCarLeft from "./../../../../assets/icon/car.svg";
import iconBike from "./../../../../assets/icon/bike.svg";
import iconBikeLeft from "./../../../../assets/icon/bike.svg";
import iconOffroad from "./../../../../assets/icon/offroad.svg";
import iconOffroadLeft from "./../../../../assets/icon/offroad.svg";
import iconVan from "./../../../../assets/icon/van.svg";
import iconVanLeft from "./../../../../assets/icon/van.svg";
import iconPickup from "./../../../../assets/icon/pickup.svg";
import iconPickupLeft from "./../../../../assets/icon/pickup.svg";
import iconTruck from "./../../../../assets/icon/truck.svg";
import iconTruckLeft from "./../../../../assets/icon/truck.svg";
import iconBus from "./../../../../assets/icon/bus.svg";
import iconBusLeft from "./../../../../assets/icon/bus.svg";
import iconTractor from "./../../../../assets/icon/tractor.svg";
import iconTractorLeft from "./../../../../assets/icon/tractor.svg";
import AllImages from "../Images/AllImages";
import "leaflet-rotatedmarker";

import { BsFillPlayFill } from "react-icons/bs";

import "react-toastify/dist/ReactToastify.css";
import FilteredCctv from "../common/FilteredCctv";
import FilteredComplaint from "../common/FilteredComplaint";
import FilteredVehicle from "../common/FilteredVehicle";

function Positions({ setMarker, vehicle, filterdata }) {
  const positions = useSelector((state) => state.session.positions);
  const devices = useSelector((state) => state.devices.items);
  const clinics = useSelector((state) => state.clinics.items);
  const handleToast = useSelector((state) => state.handleToast.items);
  const selectedOption = useSelector((state) => state.filter.selectedValue);

  console.log("devices",devices)

  const [closestMarkersData, setClosestMarkersData] = useState([]);

  const FlyToLocation = ({ target }) => {
    const map = useMap();
    map.flyTo(target, 15);
    return null;
  };


  // useEffect(() => {
  //   fetchData();
  //   // Establish WebSocket connection
  //   socketRef.current = io('ws://localhost:5000');

  //   // Listen for WebSocket 'message' event
  //   socketRef.current.on('dataUpdated', () => {
  //     console.log("sdfsdf");
  //     fetchData();
  //   });

  //   // Cleanup function
  //   return () => {
  //     // Disconnect WebSocket
  //     socketRef.current.disconnect();
  //   };
  // }, []);

  // const fetchData = async () => {

  //   setLastMarkerCoords(null);
  //   try {
  //     const response = await fetch('http://localhost:5000/api/data');
  //     const data = await response.json();

  //     const lastData = data.data[data.data.length - 1];

  //     // Append the new data to the existing locations state
  //     setLocations(prevLocations => [...prevLocations, lastData]);

  //     {
  //       <ApiData />
  //     }
  //     //setLastMarkerCoords({ lat: lastData.lat, lng: lastData.lng });

  //     // alert("New data added");
  //     toast.success("This is a success message", {
  //       onClick: () => handleToastClick(lastData)
  //     });

  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // };

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  useEffect(() => {
    if (positions.length > 0 && handleToast.length > 0) {
      // Calculate distances between the latest location and all markers in the 'positions' array
      const distances = positions.map((marker, index) => {
        return {
          markerId: index + 1, // Add 1 to the index to get the correct markerId
          distance: calculateDistance(
            handleToast[handleToast.length - 1].lat,
            handleToast[handleToast.length - 1].lng,
            marker.latitude,
            marker.longitude
          ),
        };
      });

      // console.log("get distance==========", distances);

      // Sort the distances array based on distance in ascending order
      distances.sort((a, b) => a.distance - b.distance);

      // // Get the three closest markers' data
      const closestMarkers = distances.slice(0, 3).map((item) => {
        const markerData = positions.find(
          (marker, index) => index + 1 === item.markerId
        );

        // Check if markerData is not undefined before accessing latitude and longitude
        if (markerData) {
          return { lat: markerData.latitude, lng: markerData.longitude };
        } else {
          // Handle the case where markerData is undefined (e.g., markerId doesn't match any position)
          return { lat: 0, lng: 0 }; // Provide default values or handle it according to your needs
        }
      });

      // // Set the closest markers' data to the state, overwriting the previous state
      setClosestMarkersData(closestMarkers);

      // Now you have the data of the three closest markers
    }
  }, [positions, handleToast]);


  const getDeviceCategory = (item) => {
    const key = Object.keys(devices).find(
      (key) => devices[key].positionId === item
    );
    return devices[key] ? devices[key].category : null;
  };
  const filtered = React.useMemo(() => {
    return positions.filter(
      (item) =>
        vehicle.hasOwnProperty(item.deviceId) && vehicle[item.deviceId] === true
    );
  }, [positions, vehicle]);

  const sironIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.Siren,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const DefaultIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: icon,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);

  const SosIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.AlertCar,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
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
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconBikeLeft = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconBikeLeft,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconOffroad = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconOffroad,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconOffroadLeft = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconOffroadLeft,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconVan = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconVan,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconVanLeft = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconVanLeft,
      iconSize: [41, 41],
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
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconTruckLeft = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconTruckLeft,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconBus = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconBus,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconBusLeft = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconBusLeft,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const medicalIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.medical,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);

  const WaterTankIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.WaterTank,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const CamerasIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.cctv,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconTractor = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconTractor,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);
  const customIconTractorLeft = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconTractorLeft,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  }, []);

  const getIcon = (itemType, itemCourse) => {
    if (itemType === "Car" && itemCourse <= 180) {
      return customIconCar;
    } else if (itemType === "Car" && itemCourse > 180) {
      return customIconCarLeft;
    } else if (itemType === "Motercycle" && itemCourse <= 180) {
      return customIconBike;
    } else if (itemType === "Motercycle" && itemCourse > 180) {
      return customIconBikeLeft;
    } else if (itemType === "Offroad" && itemCourse <= 180) {
      return customIconOffroad;
    } else if (itemType === "Offroad" && itemCourse > 180) {
      return customIconOffroadLeft;
    } else if (itemType === "Van" && itemCourse <= 180) {
      return customIconVan;
    } else if (itemType === "Van" && itemCourse > 180) {
      return customIconVanLeft;
    } else if (itemType === "Pickup" && itemCourse <= 180) {
      return customIconPickup;
    } else if (itemType === "Pickup" && itemCourse > 180) {
      return customIconPickupLeft;
    } else if (itemType === "Truck" && itemCourse <= 180) {
      return customIconTruck;
    } else if (itemType === "Truck" && itemCourse > 180) {
      return customIconTruckLeft;
    } else if (itemType === "Bus" && itemCourse <= 180) {
      return customIconBus;
    } else if (itemType === "Bus" && itemCourse > 180) {
      return customIconBusLeft;
    } else if (itemType === "Tractor" && itemCourse <= 180) {
      return customIconTractor;
    } else if (itemType === "Truck" && itemCourse > 180) {
      return customIconTractorLeft;
    } else {
      return DefaultIcon;
    }
  };
  const markerComponents = React.useMemo(() => {
    return filtered.map((coordinate) => {
      console.log(coordinate)
      return (
        <>
          <Marker
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
          <FlyToLocation target={[coordinate.latitude, coordinate.longitude]} />
        </>
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

  const LayoutComponents = clinics.map((coordinate) => {
    if (coordinate.Longitude === 0 && coordinate.Latitude === 0) {
      return null;
    }
    return (
      <>
        <Marker
          // rotationAngle={coordinate.course}
          // rotationOrigin={[coordinate.latitude, coordinate.longitude]}
          position={[coordinate.Latitude, coordinate.Longitude]}
          icon={
            coordinate.Category === "Clinic"
              ? medicalIcon
              : coordinate.Category === "Water Tank"
              ? WaterTankIcon
              : coordinate.Category === "Cameras"
              ? CamerasIcon
              : DefaultIcon
          }
          eventHandlers={{
            click: (e) => {
              setMarker(coordinate.id);
            },
          }}
        >
          <Popup
            closeButton={false}
            closeOnClick={true}
            autoClose={false}
            autoPan={true}
            keepInView={true}
            className="bg-transparent"
          >
            <div className=" flex flex-col w-60">
              <div className="flex border-2 rounded-t-lg border-slate-800 bg-slate-800 w-full justify-center">
                <span className=" flex text-xl justify-center py-4 font-bold text-white">
                  {coordinate.Category}
                </span>
              </div>
              <div className="flex border-2 border-t-0 border-b-0  border-slate-800 bg-slate-100 w-full justify-center p-2">
                <span className=" flex text-md font-bold justify-center">
                  Description
                </span>
              </div>
              <div className="flex border-2 border-t-0 border-slate-800 bg-slate-100 w-full justify-center p-2">
                <span className=" flex text-md justify-center text-center">
                  {coordinate.Description}{" "}
                </span>
              </div>

              <div className="flex flex-row border-2 border-t-0 border-b-0 border-slate-800 bg-slate-100 w-full p-2">
                <div className="flex bg-slate-100 w-full ">
                  <span className=" flex text-md justify-start text-left font-bold">
                    Name:{" "}
                  </span>
                </div>

                <div className="flex  bg-slate-100 w-full ">
                  <span className=" flex text-md justify-start text-left">
                    {coordinate.CreatedBy}{" "}
                  </span>
                </div>
              </div>

              <div className="flex flex-row border-2 border-t-0 border-b-0 border-slate-800 bg-slate-100 w-full p-2">
                <div className="flex bg-slate-100 w-full ">
                  <span className=" flex text-md justify-start text-left font-bold">
                    Sector:{" "}
                  </span>
                </div>

                <div className="flex  bg-slate-100 w-full ">
                  <span className=" flex text-md justify-start text-left">
                    {coordinate.Sector}{" "}
                  </span>
                </div>
              </div>

              <div className="flex flex-row border-2 border-t-0 border-b-0 border-slate-800 bg-slate-100 w-full p-2">
                <div className="flex bg-slate-100 w-full ">
                  <span className=" flex text-md justify-start text-left font-bold">
                    Date Filed:{" "}
                  </span>
                </div>

                <div className="flex  bg-slate-100 w-full ">
                  <span className=" flex text-md justify-start text-left">
                    {coordinate.CreatedAt}{" "}
                  </span>
                </div>
              </div>
              <div className="flex flex-row border-2 border-t-0 rounded-b-lg  border-slate-800 bg-slate-100 w-full p-2 items-center">
                <div className="flex bg-slate-100 w-full ">
                  <span className=" flex text-md justify-start text-left font-bold">
                    View Angle{" "}
                  </span>
                </div>
                <div className="flex bg-slate-100 w-full ">
                  <button className="bg-black text-lg text-white px-3 py-1 rounded-md">
                    <BsFillPlayFill />
                  </button>
                </div>
              </div>
            </div>
          </Popup>
          <Tooltip>{coordinate.Category}</Tooltip>
        </Marker>
        <FlyToLocation target={[coordinate.Latitude, coordinate.Longitude]} />
      </>
    );
  });

  const ApiData = handleToast.map((location) => {
    // console.log("my data i am fahad  ", location.lat);
    if (location.lat === 0 && location.lat === 0) {
      return null;
    }
    return (
      <div>
        <Marker
          rotationAngle={location.course}
          rotationOrigin={[location.lat, location.lng]}
          position={[location.lat, location.lng]}
          icon={sironIcon}
        >
          <Popup>
            {/* Add popup content */}
            <div>
              <h3>{location.description}</h3>
              <p>Created at: {location.created_at}</p>
            </div>
          </Popup>
        </Marker>

        {closestMarkersData.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            icon={SosIcon}
          >
            <Popup>
              {/* Add popup content */}
              <div>
                <h3>Closest Marker {index + 1}</h3>
                <p>Latitude: {marker.lat}</p>
                <p>Longitude: {marker.lng}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        {/* {lastMarkerCoords!==null && <FlyToLocation target={lastMarkerCoords} />} */}
      </div>
    );
  });

  const VehicleLayoutComponent = React.useMemo(() => {
    return positions.map((coordinate) => {
      console.log("coordinates" , coordinate)
      if (coordinate.longitude === 0 && coordinate.latitude === 0) {
        return null;
      }
      return (
        <>
          <Marker
            rotationAngle={coordinate.course}
            rotationOrigin={[coordinate.latitude, coordinate.longitude]}
            position={[coordinate.latitude, coordinate.longitude]}
            icon={
              coordinate.Category === "Clinic"
                ? medicalIcon
                : coordinate.Category === "Water Tank"
                ? WaterTankIcon
                : coordinate.category === "Cameras"
                ? CamerasIcon
                : DefaultIcon
            }
            eventHandlers={{
              click: (e) => {
                setMarker(coordinate.id);
              },
            }}
          >
            <Popup
              closeButton={false}
              closeOnClick={true}
              autoClose={false}
              autoPan={true}
              keepInView={true}
              className="bg-transparent"
            >
              <div className=" flex flex-col w-60">
                <div className="flex border-2 rounded-t-lg border-slate-800 bg-slate-800 w-full justify-center">
                  <span className=" flex text-xl justify-center py-4 font-bold text-white">
                    {coordinate.Category}
                  </span>
                </div>
                <div className="flex border-2 border-t-0 border-b-0  border-slate-800 bg-slate-100 w-full justify-center p-2">
                  <span className=" flex text-md font-bold justify-center">
                    Description
                  </span>
                </div>
                <div className="flex border-2 border-t-0 border-slate-800 bg-slate-100 w-full justify-center p-2">
                  <span className=" flex text-md justify-center text-center">
                    {coordinate.Description}{" "}
                  </span>
                </div>

                <div className="flex flex-row border-2 border-t-0 border-b-0 border-slate-800 bg-slate-100 w-full p-2">
                  <div className="flex bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left font-bold">
                      Name:{" "}
                    </span>
                  </div>

                  <div className="flex  bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left">
                      {coordinate.CreatedBy}{" "}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row border-2 border-t-0 border-b-0 border-slate-800 bg-slate-100 w-full p-2">
                  <div className="flex bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left font-bold">
                      Sector:{" "}
                    </span>
                  </div>

                  <div className="flex  bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left">
                      {coordinate.Sector}{" "}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row border-2 border-t-0 border-b-0 border-slate-800 bg-slate-100 w-full p-2">
                  <div className="flex bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left font-bold">
                      Date Filed:{" "}
                    </span>
                  </div>

                  <div className="flex  bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left">
                      {coordinate.CreatedAt}{" "}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row border-2 border-t-0 rounded-b-lg  border-slate-800 bg-slate-100 w-full p-2 items-center">
                  <div className="flex bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left font-bold">
                      View Angle{" "}
                    </span>
                  </div>
                  <div className="flex bg-slate-100 w-full ">
                    <button className="bg-black text-lg text-white px-3 py-1 rounded-md">
                      <BsFillPlayFill />
                    </button>
                  </div>
                </div>
              </div>
            </Popup>
            <Tooltip>{coordinate.Category}</Tooltip>
          </Marker>
          <FlyToLocation target={[coordinate.latitude, coordinate.longitude]} />
        </>
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
  const filteredComponents = filterdata.map((coordinate) => {
    if (
      (selectedOption === "cctv" &&
        (coordinate.latitude === undefined ||
          isNaN(coordinate.latitude) ||
          coordinate.longitude === undefined ||
          isNaN(coordinate.longitude))) ||
      (selectedOption === "complaint" &&
        (coordinate.lat === undefined ||
          isNaN(coordinate.lat) ||
          coordinate.lng === undefined ||
          isNaN(coordinate.lng))) ||
      (selectedOption === "vehicle" &&
        (coordinate.latitude === undefined ||
          isNaN(coordinate.latitude) ||
          coordinate.longitude === undefined ||
          isNaN(coordinate.longitude)))
    ) {
      return null; // Skip markers with undefined or invalid latitude or longitude
    } else if (selectedOption === "cctv") {
      return (
        // CCTV Marker and Popup
        <FilteredCctv coordinate={coordinate} />
      );
    } else if (selectedOption === "complaint") {
      return (
        // Complaint Marker and Popup
        <FilteredComplaint coordinate={coordinate} />
      );
    } else if (selectedOption === "vehicle") {
      return <FilteredVehicle coordinate={coordinate} />;
    } else {
      // Handle other selectedOption values (e.g., "vehicle") if needed
      return null;
    }
  });

  return (
    <>
      {markerComponents}

      {LayoutComponents}
      {VehicleLayoutComponent}
      {filteredComponents}
      {handleToast.length !== 0 ? ApiData : null}
    </>
  );
}

export default Positions;
