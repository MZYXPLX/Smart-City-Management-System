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
  const groups = useSelector((state) => state.groups.items);

  const items = devices.filter((device) => device.groupId === item.id);
  var subItems = [];

  {
    Object.values(groups).map((group) => {
      if (group.groupId === item.id) {
        subItems = [
          ...subItems,
          ...devices.filter((device) => device.groupId === group.id),
        ];
      }
    });
  }
  const [checkedItems, setCheckedItems] = useState({});
  const updatedState = {};
  useEffect(() => {
    if (items.length > 0) {
      items.map((item) => (updatedState[item.id] = false));
      if (subItems.length > 0) {
        subItems.map((item) => (updatedState[item.id] = false));
      }

      setCheckedItems({
        ...checkedItems,
        ...updatedState,
      });
    }
  }, []);

  const handleChange = (event) => {
    const updatedState = {};
    if (items.length > 0) {
      items.map((item) => (updatedState[item.id] = event.target.checked));
      if (subItems.length > 0) {
        subItems.map((item) => (updatedState[item.id] = event.target.checked));
      }
      setCheckedItems({
        ...checkedItems,
        ...updatedState,
      });
    }

  };
  const handleChangeSub = (event) => {
    const updatedState = {};
    if (subItems.length > 0) {
      subItems.map((item) =>
        event.target.value === item.groupId
          ? (updatedState[item.id] = event.target.checked)
          : updatedState[item.id]
      );
    }
    setCheckedItems({
      ...checkedItems,
      ...updatedState,
    });
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
          className="py-2 mt-2 border-none bg-slate-200 shadow-xl ring-1 rounded-xl gap-2 "
        >
          <div className="flex flex-col ">
            <div class="flex cursor-pointer w-full  max-w-sm mx-auto  hover:shadow-md   items-center gap-2 py-2">
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
              <div class="flex-initial  float-left text-sm font-bold text-gray-700">
                {item.name}
              </div>
              <div class="flex-initial absolute right-0 mr-20">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
              <div class="flex-initial absolute right-0 mr-12 text-sm font-bold text-gray-700">
                {items.length}
              </div>
            </div>

            {Object.values(groups).map((group) => {
              if (group.groupId === item.id) {
                return (
                  <div class="flex cursor-pointer w-full  max-w-sm mx-auto  hover:shadow-md   items-center gap-2 py-2 ml-8">
                    <div class="flex-initial">
                      <input
                        class=" float-left m-[6px] h-[1.00rem] w-[1.00rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-gray-700 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:border-gray-700 checked:bg-gray-700"
                        type="checkbox"
                        checked={Object.keys(checkedItems).every(
                          (k) => checkedItems[k]
                        )}
                        value={group.id}
                        id={group.id}
                        onChange={handleChangeSub}
                      />
                    </div>
                    <div class="flex-initial  float-left text-sm font-bold text-gray-700">
                      {group.name}
                    </div>
                    <div class="flex-initial absolute right-0 mr-20">
                      <svg
                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </div>
                    <div class="flex-initial absolute right-0 mr-12 text-sm font-bold text-gray-700">
                      {
                        devices.filter((device) => device.groupId === group.id)
                          .length
                      }
                    </div>
                  </div>
                );
              }
            })}
          </div>
          {/* <div class="flex cursor-pointer w-full  max-w-sm mx-auto bg-slate-200  shadow-xl hover:shadow-md ring-1 ring-black/5 rounded-xl items-center gap-2 py-2">
            <div class="flex-initial">
              <input
                class=" float-left m-[6px] h-[1.00rem] w-[1.00rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-gray-700 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:border-gray-700 checked:bg-gray-700"
                type="checkbox"
                checked={Object.keys(checkedItems).every((k) => checkedItems[k])}
                value={item.id}
                id={item.id}
                onChange={handleChange}
              />
            </div>
            <div class="flex-initial  float-left text-sm font-bold text-gray-700">
              {item.name}
            </div>
            <div class="flex-initial absolute right-0 mr-20">
              <svg
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <div class="flex-initial absolute right-0 mr-12 text-sm font-bold text-gray-700">
              {items.length}
            </div>
          </div> */}
        </AccordionHeader>
        <AccordionBody>
          <ul
            role="list"
            className="divide-y divide-gray-800 bg-slate-300  rounded-xl p-2 mr-6 "
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

            {Object.values(subItems).map((item) => {
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
