import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React from "react";
import icon from "./../../../../assets/icon/default.svg";
import { useSelector } from "react-redux";
import AllImages from "../Images/AllImages";
import { BsFillPlayFill } from "react-icons/bs";

function OverlayPositions() {
  const clinics = useSelector((state) => state.clinics.items);
  const cctv = useSelector((state) => state.cctvClinics.items);

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

  const layoutComponents = clinics.map((coordinate) => {
    if (coordinate.Longitude === 0 && coordinate.Latitude === 0) {
      return null;
    }
    return (
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
    );
  });

  const cctvLayoutComponents = cctv.map((coordinate) => {
    if (coordinate.longitude === 0 && coordinate.latitude === 0) {
      return null;
    }
    return (
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
      </Marker>
    );
  });

  return (
    <>
      {layoutComponents}
      {cctvLayoutComponents}
    </>
  );
}

export default OverlayPositions;
