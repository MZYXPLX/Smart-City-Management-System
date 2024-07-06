import { Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React from "react";
import icon from "./../../../../assets/icon/default.svg";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import cameras from "../../../../assets/icon/cctv.jpg";
import moment from "moment";
import AllImages from "../Images/AllImages";
import { BsFillPlayFill } from "react-icons/bs";
import FlyToLocation from "../common/FlyToLocation";
import FilteredCctv from "../common/FilteredCctv";
import FilteredComplaint from "../common/FilteredComplaint";
import FilteredVehicle from "../common/FilteredVehicle";
import dummyData from "../../../../data/dummy.json"

////////////////////////////////////////////////////////////

function Positions({ complaint,filterdata }) {
  const clinics = useSelector((state) => state.clinics.items);
  const cctv = useSelector((state) => state.cctvClinics.items);

  const groups = useSelector((state) => state.groups.items);
  const devices = useSelector((state) => state.devices.items);
  const selectedOption = useSelector((state) => state.filter.selectedValue);

  var securityPositions = [];

  const filtered = React.useMemo(() => {
    return dummyData.data.filter(
      (item) => complaint.hasOwnProperty(item.id) && complaint[item.id] === true
    );
  }, [ complaint]);
 
  const cctvicon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: cameras,
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
  const GenSetIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.GenSet,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);
  
  
  const TransfarmerIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.Transformer,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);
  const MasjidIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.Masjid,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);

  const SPECIALPlaces = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.SpecialPlaces,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);
  const othericon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.other,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);
  const checkPostIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.CheckPost,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);
  const ParkIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.Park,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);

  const WaterTankIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.WaterTank,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);
  const SchoolIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.school,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);
  const MarqueeIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.Marquee,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);

  const ClinicIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.Clinic,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);

  const ChowkIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.Chowk,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);

  const PetrolPumpIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.PetrolPump,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);
  const GatesIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.Gates,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);

  const GridStationIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.GridStation,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);

  const RestaurantIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.Restaurant,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);

  const BTSIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.BTS,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);

  const BankIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.Bank,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);

  const LandMarkIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.LandMark,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);

  const FDHIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.Fdh,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);

  const HandHoleIcon = React.useMemo(() => {
    return new L.Icon({
      iconUrl: AllImages.HandHole,
      iconSize: [41, 41],
      iconAnchor: [12, 21],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [23, 23],
    });
  }, []);
  const getDeviceCategory = (value) => {
    const data = devices.filter((item) => item.id === value);
    return data[0].Category;
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
            position={[coordinate.Latitude, coordinate.Longitude]}
            icon={
              coordinate.Category === "BTS"
                ? BTSIcon
                : coordinate.Category === "FDH"
                ? FDHIcon
                : coordinate.Category === "Gen Set"
                ? GenSetIcon
                : coordinate.Category === "MASJid"
                ? MasjidIcon
                : coordinate.Category === "Check Post"
                ? checkPostIcon
                : coordinate.Category === "Other"
                ? othericon
                : coordinate.Category === "SPECIAL PLACES"
                ? SPECIALPlaces
                : coordinate.Category === "Park"
                ? ParkIcon
                : coordinate.Category === "Water Tank"
                ? WaterTankIcon
                : coordinate.Category === "SCHOOL"
                ? SchoolIcon
                : coordinate.Category === "MARQUEE"
                ? MarqueeIcon
                : coordinate.Category === "Clinic"
                ? ClinicIcon
                : coordinate.Category === "Chowk"
                ? ChowkIcon
                : coordinate.Category === "HAND HOLE"
                ? HandHoleIcon
                : coordinate.Category === "Transformer"
                ? TransfarmerIcon
                : coordinate.Category === "Bank"
                ? BankIcon
                : coordinate.Category === "Water Pump"
                ? WaterTankIcon
                : coordinate.Category === "Petrol Pump"
                ? PetrolPumpIcon
                : coordinate.Category === "Gates"
                ? GatesIcon
                : coordinate.Category === "Grid Station"
                ? GridStationIcon
                : coordinate.Category === "Restaurant"
                ? RestaurantIcon
                : LandMarkIcon
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

                  <div className="flex bg-slate-100 w-full ">
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
  }, [
    filtered,
    TransfarmerIcon,
    SPECIALPlaces,
    MasjidIcon,
    othericon,
    checkPostIcon,
    ParkIcon,
    WaterTankIcon,
    SchoolIcon,
    MarqueeIcon,
    ClinicIcon,
    GenSetIcon,
    ChowkIcon,
    PetrolPumpIcon,
    GatesIcon,
    GridStationIcon,
    RestaurantIcon,
    BTSIcon,
    BankIcon,
    LandMarkIcon,
    FDHIcon,
    HandHoleIcon,
  ]);

  const LayoutComponents = clinics.map((coordinate) => {
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
          <Tooltip>{coordinate.Category}</Tooltip>
        </Marker>
        <FlyToLocation target={[coordinate.Latitude, coordinate.Longitude]} />
      </>
    );
  });
  const cctvLayoutComponents = cctv.map((coordinate) => {
    return (
      <>
        <Marker
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

  const securityComponents = React.useMemo(() => {
    return securityPositions.map((coordinate) => {
      return (
        <>
          <Marker
            position={[coordinate.latitude, coordinate.longitude]}
            icon={cctvicon}
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
  }, [securityPositions]);

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
      {filteredComponents}
      {securityComponents}
      {cctvLayoutComponents}
      {clinics.length !== 0 && LayoutComponents}
    </>
  );
}

export default Positions;
