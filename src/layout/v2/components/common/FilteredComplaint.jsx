import React from 'react'
import AllImages from "../Images/AllImages";
import FlyToLocation from "../common/FlyToLocation";
import { Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import icon from "./../../../../assets/icon/default.svg";



const FilteredComplaint = ({coordinate}) => {

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
      position={[coordinate.lat, coordinate.lng]}
      icon={
        coordinate.category.name === "Electricity"
          ? WaterTankIcon
          : coordinate.category.name === "Plumbing"
          ? WaterTankIcon
          : coordinate.category.name === "Utility Bills"
          ? WaterTankIcon
          : coordinate.category.name === "Water Bowzer"
          ? WaterTankIcon
          : coordinate.category.name === "TV & Internet"
          ? WaterTankIcon
          : coordinate.category.name === "Service and Maintenance"
          ? WaterTankIcon
          : coordinate.category.name === "SUI Gas"
          ? WaterTankIcon
          : coordinate.category.name === "House Construction"
          ? WaterTankIcon
          : coordinate.category.name === "Horticulture"
          ? WaterTankIcon
          : coordinate.category.name === "Garbage"
          ? WaterTankIcon
          : coordinate.category.name === "Transfer & Record"
          ? WaterTankIcon
          : coordinate.category.name === "Other"
          ? WaterTankIcon
          : coordinate.category.name === "Community Services"
          ? WaterTankIcon
          : coordinate.category.name === "Sanitation"
          ? WaterTankIcon
          : coordinate.category.name === "Security"
          ? WaterTankIcon
          : coordinate.category.name === "Medical"
          ? WaterTankIcon
          : coordinate.category.name === "DHAI Main Office"
          ? WaterTankIcon
          : coordinate.category.name === "Jacaranda Family Club"
          ? WaterTankIcon
          : coordinate.category.name === "Town Planning"
          ? WaterTankIcon
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
              {coordinate.category.name}
            </span>
          </div>
          <div className="flex border-2 border-t-0 border-b-0  border-slate-800 bg-slate-100 w-full justify-center p-2">
            <span className=" flex text-md font-bold justify-center">
              Description
            </span>
          </div>
          <div className="flex border-2 border-t-0 border-slate-800 bg-slate-100 w-full justify-center p-2">
            <span className=" flex text-md justify-center text-center">
              {coordinate.description}{" "}
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
                {coordinate.fellowup_name}{" "}
              </span>
            </div>
          </div>

          <div className="flex flex-row border-2 border-t-0 border-b-0 border-slate-800 bg-slate-100 w-full p-2">
            <div className="flex bg-slate-100 w-full ">
              <span className=" flex text-md justify-start text-left font-bold">
                Cell No:{" "}
              </span>
            </div>

            <div className="flex  bg-slate-100 w-full ">
              <span className=" flex text-md justify-start text-left">
                {coordinate.fellowup_cell}{" "}
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
                {coordinate.date}{" "}
              </span>
            </div>
          </div>
          <div className="flex flex-row border-2 border-t-0 rounded-b-lg  border-slate-800 bg-slate-100 w-full p-2">
            <div className="flex bg-slate-100 w-full ">
              <span className=" flex text-md justify-start text-left font-bold">
                Address:{" "}
              </span>
            </div>

            <div className="flex  bg-slate-100 w-full ">
              {/* <span className=" flex text-md justify-start text-left">
            {"House # " +
              coordinate.house_no +
              ", " +
              coordinate.street.description +
              ", Sector " +
              coordinate.sector.description +
              ", DHA " +
              coordinate.phase.description}{" "}
          </span> */}
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
    <FlyToLocation target={[coordinate.lat, coordinate.lng]} />
  </>
  )
}

export default FilteredComplaint