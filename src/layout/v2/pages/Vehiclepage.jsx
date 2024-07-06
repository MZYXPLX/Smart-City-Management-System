import React, { useState } from "react";
import Drawer from "../components/vehicle/Drawer";
import Index from "../components/vehicle/Index";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

export default function Vehiclepage() {
  const [vehicle, setVehicle] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      <div className="">
        <div className=" border-none rounded-lg dark:border-gray-700">
          <div className="w-full flex justify-between">
            <Index vehicle={vehicle} setShowSidebar={setShowSidebar} />
            {showSidebar && (
              <div className=" flex h-screen  items-center bottom-20 w-5 bg-gray-50 justify-center cursor-pointer"
              onClick={() => setShowSidebar(false)}
              >
                <MdOutlineArrowForwardIos
                  className="w-28 h-28"
                />
              </div>
            )}
           
            <Drawer
              vehicle={vehicle}
              setVehicle={setVehicle}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
            {!showSidebar && (
              <div className="flex h-screen  items-center bottom-20 w-5 bg-gray-50 justify-center cursor-pointer"
              onClick={() => setShowSidebar(true)}
              >
                <MdOutlineArrowBackIos
                  className="w-28 h-28"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
