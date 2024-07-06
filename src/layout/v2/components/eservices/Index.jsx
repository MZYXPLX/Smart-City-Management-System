import React, { useState } from "react";
import Map from "./Map";
import { GoDotFill } from "react-icons/go";
import { TbCirclesFilled } from "react-icons/tb";

export default function Index({ complaint, setShowSidebar }) {
  const [zoom, setZoom] = useState([33.5402149, 73.0991416]);
  const [cluster, setCluster] = useState(true);
  const [mapType, setMapType] = useState(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );

  const [isVisible, setIsVisible] = useState(false);

  const handleMapTypeChange = (e) => {
    setMapType(e.target.value);
  };

  

  const tooltipText = cluster ? "Enable Cluster" : "Disable Cluster";

  return (
    <>
      <div
        className="flex w-screen items-start justify-center h-screen  rounded  dark:bg-transparent"
        onClick={() => setShowSidebar(false)}
      >
        <Map
          zoom={zoom}
          complaint={complaint}
          cluster={cluster}
          mapType={mapType}
        />
        {cluster ? (
          <>
            <div
              className="absolute flex justify-center items-center bottom-20 left-10 z-10 w-12 h-12  border border-black rounded-full bg-gray-400 cursor-pointer"
              onClick={() => setCluster(!cluster)}
              onMouseEnter={() => setIsVisible(true)}
              onMouseLeave={() => setIsVisible(false)}
              data-tip={tooltipText}
            >
              <TbCirclesFilled className="w-6 h-6"/>
            </div>
            {isVisible && (
              <div className="absolute bottom-20 z-10 left-24 w-[8rem] text-center text-sm text-black p-1 bg-yellow-100 rounded-lg border shadow-lg">
                {tooltipText}
              </div>
            )}
          </>
        ) : (
          <>
            <div
              className="absolute flex justify-center items-center bottom-20 left-10 z-10 w-12 h-12  border border-black rounded-full bg-gray-400 cursor-pointer"
              onClick={() => setCluster(!cluster)}
              onMouseEnter={() => setIsVisible(true)}
              onMouseLeave={() => setIsVisible(false)}
              data-tip={tooltipText}
            >
              <GoDotFill className="w-6 h-6"/>
            </div>
            {isVisible && (
              <div className="absolute bottom-20 z-10 left-24 w-[8rem] text-center text-sm text-black p-1 bg-yellow-100 rounded-lg border shadow-lg">
                {tooltipText}
              </div>
            )}
          </>
        )}

        <select
          id="maps"
          className=" absolute bottom-36 left-10 p-2 z-10 focus:outline-none text-black border-2 border-gray-400 bg-slate-100 hover:bg-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-slate-50 dark:hover:bg-slate-700 dark:focus:ring-white"
          onChange={(e) => handleMapTypeChange(e)}
        >
          <option value="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
            Default Map
          </option>
          <option value="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}">
            Satelite Map
          </option>
          <option value="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png">
            Dark Map
          </option>
        </select>
      </div>
    </>
  );
}
