import React from "react";
import { useSelector } from "react-redux";
import Group from "./Group";
import DrawerHeader from "../common/DrawerHeader";

export default function Drawer({
  complaint,
  setComplaint,
  showSidebar,
  vehicle,
  setVehicle,
}) {
  const devices = useSelector((state) => state.devices.items);

  const locations = [
    {
      phase: "Phase - I",
      sectors: [
        "A",
        "Sector A1",
        "B",
        "Sector B1",
        "C",
        "D",
        "E",
        "Defence Avenue",
        "Sector B Orchard",
        "Sector C Orchard",
      ],
    },
    {
      phase: "Phase - II",
      sectors: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    },
  ];
  return (
    <div
      className={`${
        showSidebar ? "w-[100%] md:w-[60%] lg:w-[30%] px-2" : "w-0"
      } z-50 items-start overflow-x-auto h-screen  justify-center  rounded bg-gray-50 dark:bg-gray-800  transition-all	ease-in-out delay-150 duration-300`}
    >
      <DrawerHeader />
      {Object.values(locations).map((location) => {
        return (
          <Group
            vehicle={vehicle}
            setVehicle={setVehicle}
            item={location}
            phase={location.phase}
            sectors={location.sectors}
            setComplaint={setComplaint}
            complaint={complaint}
            devices={devices}
          />
        );
      })}
    </div>
  );
}
