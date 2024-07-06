import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Sector from "./Sector";
import { useSelector } from "react-redux";

export default function Group({
  phase,
  sectors,
  complaint,
  setComplaint,
}) {
  const [open, setOpen] = useState(0);
  const cctv = useSelector((state) => state.cctv.items);
  const [checkedItems, setCheckedItems] = useState({});

  const filtered = React.useMemo(() => {
    return cctv.filter((item) => item.phase && item.phase === phase);
  }, [ phase,cctv]);

  // Update checked items based on the filtered sectors
  useEffect(() => {
    const updatedState = {};
    if (filtered.length > 0) {
      filtered.forEach((item) => (updatedState[item.id] = false));
      setCheckedItems(updatedState);
    }
  }, [filtered]);

  const handleChange = (event) => {
    const { checked } = event.target;
    const updatedState = {};
    if (filtered.length > 0) {
      filtered.forEach((item) => (updatedState[item.id] = checked));
      setCheckedItems(updatedState);
    }
  };

  useEffect(() => {
    setComplaint({ ...complaint, ...checkedItems });
  }, [checkedItems, setComplaint]);

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
          onClick={() => handleOpen(1)}
          className="py-1 border-none"
        >
          <div className="flex cursor-pointer w-full  max-w-sm mx-auto bg-slate-200  shadow-xl hover:shadow-md ring-1 ring-black/5 rounded-xl items-center gap-2 py-2">
            <div className="flex-initial">
              <input
                className="float-left m-[6px] h-[1.00rem] w-[1.00rem]"
                type="checkbox"
                checked={Object.values(checkedItems).every((k) => k)}
                onChange={handleChange}
              />
            </div>
            <div className="flex-initial flex gap-2 items-center float-left text-sm font-bold text-gray-700 ml-4">
              {phase}
            </div>
            <div className="flex-initial absolute right-0 mr-12 text-sm font-bold text-gray-700">
              {filtered.length}
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody className="pl-8">
          {Object.values(sectors).map((sector) => {
            return (
              <Sector
                key={sector} // Make sure to provide a unique key for each sector
                phase={phase}
                sector={sector}
                checkedItems={checkedItems} // Pass down the checkedItems to Sector component
                setCheckedItems={setCheckedItems}
              />
            );
          })}
        </AccordionBody>
      </Accordion>
    </>
  );
}
