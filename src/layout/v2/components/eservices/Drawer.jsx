import React from "react";
import Group from "./Group";
import DrawerHeader from "../common/DrawerHeader";

export default function Drawer({complaint, setComplaint,showSidebar}) {

    const locations = [{
        phase: 'Phase - I',
        sectors: ['A', 'B', 'C', 'D', 'E'],
    },
    {
        phase: 'Phase - II',
        sectors: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    },
    ];

    return (

        <div className={`${showSidebar ? "w-[100%] md:w-[60%] lg:w-[30%]  px-2" : "w-0"} z-50 items-start overflow-x-auto h-screen  justify-center  rounded bg-gray-50 dark:bg-gray-800  transition-all	ease-in-out delay-150 duration-300`}>
            <DrawerHeader/>
            
            {Object.values(locations).map((location) => {
                return <Group phase={location.phase} sectors={location.sectors} setComplaint={setComplaint} complaint={complaint}  />;
            })}
        </div>
    );
}
