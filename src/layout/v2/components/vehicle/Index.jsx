import React, { useState } from "react";
import Map from "./Map";
import {GoDotFill} from "react-icons/go"
import {TbCirclesFilled} from "react-icons/tb"

export default function Index({ vehicle, setShowSidebar}) {
  const [zoom, setZoom] = useState([33.5402149, 73.0991416]);
  const [cluster, setCluster] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const tooltipText = cluster ? "Enable Cluster" : "Disable Cluster";

  return (
    <>
      <div className="flex w-screen items-start justify-center h-screen  rounded  dark:bg-transparent" 
        onClick={() => setShowSidebar(false)}
        >
        <Map zoom={zoom} vehicle={vehicle} cluster={cluster} />
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
      </div>
    </>
  );
}
