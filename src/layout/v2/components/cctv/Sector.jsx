import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Complaint from "./Complaint";
import { useSelector } from "react-redux";

export default function Sector({ phase, sector, checkedItems, setCheckedItems }) {
  const [open, setOpen] = useState(0);
  const cctv = useSelector((state) => state.cctv.items);

  // Filter the cctv items based on phase and sector
  const filtered = React.useMemo(() => {
    return cctv.filter(
      (item) =>
        item.phase &&
        item.phase === phase &&
        item.sector &&
        item.sector === sector
    );
  }, [phase, sector,cctv]);

  // Check if all checkboxes inside this sector are selected
  const areAllSelected = filtered.every((item) => checkedItems[item.id]);

  const handleChange = (event) => {
    const { checked } = event.target;
    const updatedState = {};
    if (filtered.length > 0) {
      filtered.forEach((item) => (updatedState[item.id] = checked));
      setCheckedItems((prevState) => ({
        ...prevState,
        ...updatedState,
      }));
    }
  };

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

  useEffect(() => {
    // Update checked status of this sector in the parent component
    setCheckedItems((prevState) => ({
      ...prevState,
      [phase + sector]: areAllSelected,
    }));
  }, [areAllSelected]);

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
                class="float-left m-[6px] h-[1.00rem] w-[1.00rem]"
                type="checkbox"
                checked={areAllSelected}
                value={phase + sector}
                id={phase + sector}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-sm">
                {" "}
                {!sector.includes(" ") ? "Sector " + sector : sector}
              </span>
            </div>
            <div class="flex-initial absolute right-0 mr-12 text-sm font-bold text-gray-700">
              {filtered.length}
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody>
          {Object.values(filtered).map((item) => {
            return (
              <Complaint
                key={item.id} // Make sure to provide a unique key for each Complaint component
                item={item}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
            );
          })}
        </AccordionBody>
      </Accordion>
    </>
  );
}
