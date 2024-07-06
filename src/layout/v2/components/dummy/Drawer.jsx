import React from "react";

import Group from "./Group";
import DrawerHeader from "../common/DrawerHeader";

export default function Drawer({ complaint,
    setComplaint,
    showSidebar,
    vehicle,
    setVehicle,}) {
  const locations = [
    {
      phase: "Phase - I",
      sectors: ["A", "B", "C", "D", "E", "F"],
    },
    {
      phase: "Phase - II",
      sectors: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    },
    {
      phase: "Phase - III",
      sectors: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    },
    {
      phase: "Phase - 1",
      sectors: ["Sector A", "Sector B", "Sector C", "Sector D", "Sector E"],
    },
    {
      phase: "Phase - 2",
      sectors: [
        "Sector H",
        "Sector A",
        "Sector B",
        "Sector D",
        "Sector E",
        "Sector C",
      ],
    },
    {
      phase: "Phase - 4",
      sectors: ["Sector C", "Sector A", "Sector B", "Sector D"],
    },
  ];
  return (
    <div
      className={`${
        showSidebar ? "w-[100%] md:w-[60%] lg:w-[30%] px-2" : "w-0"
      } pb-5 z-50 items-start overflow-x-auto h-screen  justify-center  rounded bg-gray-50 dark:bg-gray-800  transition-all	ease-in-out delay-150 duration-300`}
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
          />
        );
      })}
    </div>
  );
}
