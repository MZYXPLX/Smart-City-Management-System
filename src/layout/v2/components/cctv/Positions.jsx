import { Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React from "react";
import icon from "./../../../../assets/icon/default.svg";
import { useSelector } from "react-redux";
import iconCar from "./../../../../assets/icon/car.svg";
import { toast } from "react-toastify";

import { BsFillPlayFill } from "react-icons/bs";
import moment from "moment";
import AllImages from "../Images/AllImages";
import FlyToLocation from "../common/FlyToLocation";
import FilteredCctv from "../common/FilteredCctv";
import FilteredComplaint from "../common/FilteredComplaint";
import FilteredVehicle from "../common/FilteredVehicle";

function Positions({ complaint, filterdata }) {
  const complaints = useSelector((state) => state.cctv.items);
  const groups = useSelector((state) => state.groups.items);
  const devices = useSelector((state) => state.devices.items);
  const clinics = useSelector((state) => state.clinics.items);
  const cctv = useSelector((state) => state.cctvClinics.items);
  const selectedOption = useSelector((state) => state.filter.selectedValue);

  var securityPositions = [];

  // Merge data based on the common identifier (id in this case)


  const filtered = React.useMemo(() => {
    return complaints.filter(
      (item) => complaint.hasOwnProperty(item.id) && complaint[item.id] === true
    );
  }, [complaints, complaint]);

  const cameraIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.cctv,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);
  const DefaultIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: icon,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);

  const carIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: iconCar,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);
  const medicalIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.medical,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
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
  const getDeviceCategory = (value) => {
    const data = devices.filter((item) => item.id === value);
    return data[0].category;
  };

  const getDeviceName = (value) => {
    const data = devices.filter((item) => item.id === value);
    return data[0].name;
  };

  const getDeviceGroup = (value) => {
    const device = devices.filter((item) => item.id === value);

    const data = groups.filter((item) => item.id === device[0].groupId);

    return data[0].name;
  };

  const format1 = "YYYY-MM-DD hh:mm:ss";

  const markerComponents = React.useMemo(() => {
    return filtered.map((coordinate) => {
      return (
        <>
          <Marker
            position={[coordinate.latitude, coordinate.longitude]}
            icon={
              coordinate.category === "Cameras"
                ? cameraIcon
                : coordinate.category === "Gates"
                ? cameraIcon
                : coordinate.category === "Water Tanks"
                ? cameraIcon
                : coordinate.category === "Other"
                ? cameraIcon
                : coordinate.category === "Control Room"
                ? cameraIcon
                : DefaultIcon
            }
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
                <div className="flex border-2 rounded-t-lg border-slate-800 bg-slate-800 w-full justify-center flex-col">
                  <span className=" flex text-xl justify-center py-2 font-bold text-white">
                    {coordinate.category}
                  </span>
                  <span className=" flex text-md justify-center py-2 font-semibold text-white">
                    {coordinate.subCategory}
                  </span>
                </div>
                <div className="flex border-2 border-t-0 border-b-0  border-slate-800 bg-slate-100 w-full justify-center p-1">
                  <span className=" flex text-md font-bold justify-center">
                    Description
                  </span>
                </div>
                <div className="flex border-2 border-t-0 border-slate-800 bg-slate-100 w-full justify-center p-1">
                  <span className=" flex text-md justify-center text-center">
                    {coordinate.description}{" "}
                  </span>
                </div>

                <div className="flex flex-row border-2 border-t-0 border-b-0 border-slate-800 bg-slate-100 w-full p-2">
                  <div className="flex bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left font-bold">
                      Other Category:{" "}
                    </span>
                  </div>

                  <div className="flex  bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left">
                      {coordinate.otherCategory}{" "}
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
                      {coordinate.sector}{" "}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row border-2 border-t-0 border-b-0 border-slate-800 bg-slate-100 w-full p-2">
                  <div className="flex bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left font-bold">
                      Phase:{" "}
                    </span>
                  </div>

                  <div className="flex  bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left">
                      {coordinate.phase}{" "}
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
            <Tooltip>{coordinate.category}</Tooltip>
          </Marker>
          <FlyToLocation target={[coordinate.latitude, coordinate.longitude]} />
        </>
      );
    });
  }, [filtered, DefaultIcon, medicalIcon, cameraIcon]);

  const layoutComponents = clinics.map((coordinate) => {
    if (coordinate.Longitude === 0 && coordinate.Latitude === 0) {
      return null;
    }
    return (
      <>
        <Marker
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
              <div className="flex border-2 rounded-t-lg border-slate-800 bg-slate-800 w-full justify-center flex-col">
                <span className=" flex text-xl justify-center py-2 font-bold text-white">
                  {coordinate.Category}
                </span>
                <span className=" flex text-md justify-center py-2 font-semibold text-white">
                  {coordinate.SubCategory}
                </span>
              </div>
              <div className="flex border-2 border-t-0 border-b-0  border-slate-800 bg-slate-100 w-full justify-center p-1">
                <span className=" flex text-md font-bold justify-center">
                  Description
                </span>
              </div>
              <div className="flex border-2 border-t-0 border-slate-800 bg-slate-100 w-full justify-center p-1">
                <span className=" flex text-md justify-center text-center">
                  {coordinate.Description}{" "}
                </span>
              </div>

              <div className="flex flex-row border-2 border-t-0 border-b-0 border-slate-800 bg-slate-100 w-full p-2">
                <div className="flex bg-slate-100 w-full ">
                  <span className=" flex text-md justify-start text-left font-bold">
                    Other Category:{" "}
                  </span>
                </div>

                <div className="flex  bg-slate-100 w-full ">
                  <span className=" flex text-md justify-start text-left">
                    {coordinate.otherCategory}{" "}
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
                    Phase:{" "}
                  </span>
                </div>

                <div className="flex  bg-slate-100 w-full ">
                  <span className=" flex text-md justify-start text-left">
                    {coordinate.Phase}{" "}
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
        </Marker>
        <FlyToLocation target={[coordinate.Latitude, coordinate.Longitude]} />
      </>
    );
  });

  const cctvLayoutComponents = cctv.map((coordinate) => {
    if (coordinate.longitude === 0 && coordinate.latitude === 0) {
      return null;
    }
    return (
     <FilteredCctv coordinate={coordinate} />
    );
  });

  const securityComponents = React.useMemo(() => {
    return securityPositions.map((coordinate) => {
      return (
        <>
          <Marker
            position={[coordinate.latitude, coordinate.longitude]}
            icon={carIcon}
          >
            <Popup
              closeButton={false}
              closeOnClick={true}
              autoClose={false}
              autoPan={true}
              keepInView={true}
              className=""
            >
              <div className=" flex flex-col w-60">
                <div className="flex border-2 rounded-t-lg border-slate-800 bg-slate-800 w-full justify-center">
                  <span className=" flex text-xl justify-center py-4 font-bold text-white">
                    {getDeviceCategory(coordinate.deviceId)}
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
                      {getDeviceName(coordinate.deviceId)}{" "}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row border-2 border-t-0 border-b-0 border-slate-800 bg-slate-100 w-full p-2">
                  <div className="flex bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left font-bold">
                      Group:{" "}
                    </span>
                  </div>

                  <div className="flex  bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left">
                      {" "}
                      {getDeviceGroup(coordinate.deviceId)}
                    </span>
                  </div>
                </div>

                <div className="flex border-2  border-slate-800 bg-slate-100 w-full justify-center p-2">
                  <span className=" flex text-md font-bold justify-center">
                    Details
                  </span>
                </div>

                <div className="flex flex-row border-2 border-t-0 border-b-0 border-slate-800 bg-slate-100 w-full p-2">
                  <div className="flex bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left font-bold">
                      Speed:{" "}
                    </span>
                  </div>

                  <div className="flex  bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left">
                      {" "}
                      {coordinate.speed + " km/h"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row border-2 border-t-0 border-b-0 border-slate-800 bg-slate-100 w-full p-2">
                  <div className="flex bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left font-bold">
                      Altitude:{" "}
                    </span>
                  </div>

                  <div className="flex  bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left">
                      {" "}
                      {coordinate.altitude + " m"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row border-2 border-t-0 border-b-0 border-slate-800 bg-slate-100 w-full p-2">
                  <div className="flex bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left font-bold">
                      Online since:{" "}
                    </span>
                  </div>

                  <div className="flex  bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left">
                      {" "}
                      {moment(coordinate.deviceTime).format(format1)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row border-2 border-t-0 rounded-b-lg border-slate-800 bg-slate-100 w-full p-2">
                  <div className="flex bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left font-bold">
                      Distance:{" "}
                    </span>
                  </div>

                  <div className="flex  bg-slate-100 w-full ">
                    <span className=" flex text-md justify-start text-left">
                      {" "}
                      {coordinate.attributes.distance + " km"}
                    </span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
          <FlyToLocation target={[coordinate.latitude, coordinate.longitude]} />
        </>
      );
    });
  }, [securityPositions, carIcon]);

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
      {layoutComponents}
      {cctvLayoutComponents}
      {filteredComponents}
      {securityComponents}
    </>
  );
}

export default Positions;
