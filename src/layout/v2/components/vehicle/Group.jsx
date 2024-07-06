import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Device from "./Device";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Group({
  item,
  devices,
  setVehicle,
  vehicle,
}) {
  const [open, setOpen] = useState(0);


  // const devices = useSelector((state) => state.devices.items);
  
  const items = devices.filter((device) => device.groupId === item.id);

  const [checkedItems, setCheckedItems] = useState({});
  const updatedState = {};

  useEffect(() => {
    if (items.length > 0) {
      items.map((item) => (updatedState[item.id] = false));
      setCheckedItems({
        ...checkedItems,
        ...updatedState,
      });
    }
  }, [devices]);

  const handleChange = (event) => {
    const updatedState = {};
    if (items.length > 0) {
      items.map((item) => (updatedState[item.id] = event.target.checked));
      setCheckedItems({
        ...checkedItems,
        ...updatedState,
      });
    }
  };


  useEffect(() => {
    // keysTrue.map((key) => setVehicle([...vehicle, key]))
    setVehicle({ ...vehicle, ...checkedItems });
  }, [checkedItems]);

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
        fill="white"
        viewBox="0 0 24 24"
        stroke="white"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <>
      <Accordion
        open={open === 1}
        className="py-0"
        icon={<Icon id={1} open={open} />}
      >
        <AccordionHeader
          onClick={(e) => handleOpen(1, e.target.value)}
          className="py-1 border-none"
        >
          <div class="flex cursor-pointer w-full  max-w-sm mx-auto bg-slate-200  shadow-xl hover:shadow-md ring-1 ring-black/5 rounded-xl items-center gap-2 py-2">
            <div class="flex-initial">
              <input
                class=" float-left m-[6px] h-[1.00rem] w-[1.00rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-gray-700 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:border-gray-700 checked:bg-gray-700"
                type="checkbox"
                checked={Object.keys(checkedItems).every(
                  (k) => checkedItems[k]
                )}
                value={item.id}
                id={item.id}
                onChange={handleChange}
              />
            </div>
            <div class="flex-initial flex gap-2 items-center float-left text-sm font-bold text-gray-700">
               {item.name}
            </div>
            <div class="flex-initial absolute right-0 mr-12 text-sm font-bold text-gray-700">
              {items.length}
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody>
          <ul
            role="list"
          >
            {Object.values(items).map((item) => {
              return (
                <Device
                  item={item}
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                />
              );
            })}
          </ul>
        </AccordionBody>
      </Accordion>
    </>
  );
}
