import React, { useState } from "react";
import Group from "./Group";
import { useSelector } from "react-redux";

import DrawerHeader from "../common/DrawerHeader";

export default function Drawer({ vehicle, setVehicle, showSidebar }) {
  const groups = useSelector((state) => state.groups.items);
  const devices = useSelector((state) => state.devices.items);
  const itemsOnline = devices.filter((device) => device.status === "online");
  const itemsOffline = devices.filter((device) => device.status === "offline");
  const itemsUnknown = devices.filter((device) => device.status === "unknown");
  const [totalHovered, setTotalHovered] = useState(false);
  const [onlineHovered, setOnlineHovered] = useState(false);
  const [offlineHovered, setOfflineHovered] = useState(false);
  const [unknownItemsHovered, setUnknownItemsHovered] = useState(false);
  const [roundedClass, setRoundedClass] = useState("rounded-r-lg");

  const handleTotalEnter = () => {
    setTotalHovered(true);
  };

  const handleTotalLeave = () => {
    setTotalHovered(false);
    setRoundedClass("rounded");
  };

  const handleOnlineEnter = () => {
    setOnlineHovered(true);
  };

  const handleOnlineLeave = () => {
    setOnlineHovered(false);
    setRoundedClass("rounded");
  };
  const handleOfflineEnter = () => {
    setOfflineHovered(true);
  };

  const handleOfflineLeave = () => {
    setOfflineHovered(false);
    setRoundedClass("rounded");
  };
  const handleUnknownItemsEnter = () => {
    setUnknownItemsHovered(true);
  };

  const handleUnknownItemsLeave = () => {
    setUnknownItemsHovered(false);
    setRoundedClass("rounded");
  };
  return (
    <>
      <div className=" items-start overflow-x-auto h-screen justify-center  rounded bg-gray-50 dark:bg-gray-800 ">
        <div className="absolute top-36 left-0 z-40 ">
          <div className="flex flex-col justify-start">
            <div
              className="flex justify-start cursor-pointer"
              onMouseEnter={handleTotalEnter}
              onMouseLeave={handleTotalLeave}
            >
              <div
                className={`flex items-center justify-center gap-4 mt-10 focus:outline-none text-white bg-[#0094FF] hover:bg-[#0094FF] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg ${
                  totalHovered ? "w-32 px-2" : "w-0 px-0"
                } text-sm h-16 ml-2 mb-2 dark:bg-[#0094FF] dark:hover:bg-[#0094FF] dark:focus:ring-blue-800 transition-all ease-in-out duration-500`}
                title="Total"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-8 w-8 ${totalHovered ? "block" : "hidden"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <div>
                    <h2
                      className={`text-md text-start font-bold ${
                        totalHovered ? "opacity-1" : "opacity-0"
                      } delay-800 duration-500 `}
                    >
                      Total
                    </h2>
                  </div>
                  <h1
                    className={`text-xl ${
                      totalHovered ? "opacity-1" : "opacity-0"
                    } delay-800 duration-500 text-start font-bold`}
                  >
                    {itemsOnline.length +
                      itemsOffline.length +
                      itemsUnknown.length}
                  </h1>
                </div>
              </div>
              {!totalHovered && (
                <div
                  className={`absolute left-0 focus:outline-none text-white bg-[#0094FF] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium ${roundedClass} text-sm px-2 h-16 mt-10 mr-2 mb-2 dark:bg-[#0094FF] dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                  title="Total"
                ></div>
              )}
            </div>
            <div
              className="flex justify-start cursor-pointer"
              onMouseEnter={handleOnlineEnter}
              onMouseLeave={handleOnlineLeave}
            >
              <div
                className={`flex items-center justify-center gap-4 focus:outline-none text-white bg-[#009B37] hover:bg-[#009B37] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm ${
                  onlineHovered ? "w-32 px-2" : "w-0 px-0"
                } h-16 py-2.5 ml-2 mb-2 dark:bg-[#009B37] dark:hover:bg-[#009B37] dark:focus:ring-[#009B37] transition-all ease-in-out duration-500`}
                title="Total"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-8 w-8 ${
                      onlineHovered ? "block" : "hidden"
                    } transition-all delay-300`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div>
                    <h2
                      className={`text-md text-start font-bold ${
                        onlineHovered ? "opacity-1" : "opacity-0"
                      } delay-800 duration-500`}
                    >
                      Online
                    </h2>
                  </div>
                  <h1
                    className={`text-xl ${
                      onlineHovered ? "opacity-1" : "opacity-0"
                    } delay-800 duration-500 text-start font-bold`}
                  >
                    {itemsOnline.length}
                  </h1>
                </div>
              </div>
              {!onlineHovered && (
                <div
                  className={`absolute left-0 focus:outline-none text-white bg-[#009B37] hover:bg-[#009B37] focus:ring-4 focus:ring-green-300 font-medium ${roundedClass} text-sm h-16 px-2 mr-2 mb-2 dark:bg-[#009B37] dark:hover:bg-[#009B37] dark:focus:ring-[#009B37]`}
                  title="Online"
                ></div>
              )}
            </div>
          </div>
          <div
            className="flex justify-start cursor-pointer"
            onMouseEnter={handleOfflineEnter}
            onMouseLeave={handleOfflineLeave}
          >
            <div
              className={`flex items-center justify-center gap-4 focus:outline-none text-white bg-[#EA0003] hover:bg-[#EA0003] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm ${
                offlineHovered ? "w-32 px-2" : "w-0 px-0"
              } h-16 ml-2 mb-2 dark:bg-[#EA0003] dark:hover:bg-[#EA0003] dark:focus:ring-[#EA0003] transition-all ease-in-out duration-500`}
              title="Offline"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 ${
                    offlineHovered ? "block" : "hidden"
                  } transition-all delay-300`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
                  />
                </svg>
              </div>
              <div>
                <div>
                  <h2
                    className={`text-md text-start font-bold ${
                      offlineHovered ? "opacity-1" : "opacity-0"
                    } delay-800 duration-500`}
                  >
                    Offline
                  </h2>
                </div>
                <h1
                  className={`text-xl ${
                    offlineHovered ? "opacity-1" : "opacity-0"
                  } delay-800 duration-500 text-start font-bold`}
                >
                  {" "}
                  {itemsOffline.length}
                </h1>
              </div>
            </div>

            {!offlineHovered && (
              <div
                className={`absolute left-0 focus:outline-none text-white bg-[#EA0003] hover:bg-[#EA0003] focus:ring-4 focus:ring-red-300 font-medium ${roundedClass} text-sm h-16 px-2 mr-2 mb-2 dark:bg-[#EA0003] dark:hover:bg-[#EA0003] dark:focus:ring-[#EA0003]`}
                title="Offline"
              ></div>
            )}
          </div>
          <div
            className="flex justify-start cursor-pointer"
            onMouseEnter={handleUnknownItemsEnter}
            onMouseLeave={handleUnknownItemsLeave}
          >
            <div
              className={`flex items-center justify-center gap-4 focus:outline-none text-white bg-[#6A6A6A] hover:bg-[#6A6A6A] focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm ${
                unknownItemsHovered ? "w-32 px-2" : "w-0 px-0"
              } h-16 ml-2 mb-2 dark:bg-[#6A6A6A] dark:hover:bg-[#6A6A6A] dark:focus:ring-[#6A6A6A] transition-all ease-in-out duration-500`}
              title="Unknown"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 ${
                    unknownItemsHovered ? "block" : "hidden"
                  } transition-all delay-300`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              </div>
              <div>
                <div>
                  <h2
                    className={`text-md text-start font-bold ${
                      unknownItemsHovered ? "opacity-1" : "opacity-0"
                    } delay-800 duration-500`}
                  >
                    Unknown
                  </h2>
                </div>
                <h1
                  className={`text-xl ${
                    unknownItemsHovered ? "opacity-1" : "opacity-0"
                  } delay-800 duration-500 text-start font-bold`}
                >
                  {itemsUnknown.length}
                </h1>
              </div>
            </div>
            {!unknownItemsHovered && (
              <div
                className={`absolute left-0 focus:outline-none text-white bg-[#6A6A6A] hover:bg-[#6A6A6A] focus:ring-4 focus:ring-gray-300 font-medium ${roundedClass} text-sm px-2 h-16 mr-2 mb-2 dark:bg-[#6A6A6A] dark:hover:bg-[#6A6A6A] dark:focus:ring-[#6A6A6A]`}
                title="Offline"
              ></div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${
          showSidebar ? "w-[100%] md:w-[60%] lg:w-[30%] px-2" : "w-0"
        } z-50 items-start overflow-x-auto h-screen  justify-center  rounded bg-gray-50 dark:bg-gray-800  transition-all	ease-in-out delay-150 duration-300`}
      >
        <DrawerHeader />

        {Object.values(groups).map((group) => {
          return (
            <Group
              item={group}
              devices={devices}
              setVehicle={setVehicle}
              vehicle={vehicle}
            />
          );
        })}
      </div>
    </>
  );
}
