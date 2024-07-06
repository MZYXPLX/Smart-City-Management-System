import React from "react";
import FlyToLocation from "../common/FlyToLocation";
import { BsFillPlayFill } from "react-icons/bs";
import AllImages from "../Images/AllImages";
import { Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";

import icon from "./../../../../assets/icon/default.svg";

const FilteredCctv = ({ coordinate }) => {
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
      </Marker>
      <FlyToLocation target={[coordinate.latitude, coordinate.longitude]} />
    </>
  );
};

export default FilteredCctv;
