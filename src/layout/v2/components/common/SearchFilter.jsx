import React, { useEffect, useState } from "react";
import { BsFilterCircle } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import complaintsData from "../../../../data/eservices.json";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../../../../store";

const SearchFilter = ({ opacity, showFilter, setShowFilter }) => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.items);
  const positions = useSelector((state) => state.session.positions);

  const mergedData = positions.map((pos) => {
    const device = devices.filter((dev) => dev.positionId === pos.id);
    return { ...pos, ...device };
  });

  const complaintData = useSelector((state) => state.categories.items);
  const complaintArray = Object.values(complaintData);

  const cctvData = useSelector((state) => state.cctv.items);

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const [selectedDateTo, setSelectedDateTo] = useState("");

  const filterData = () => {
    // Select the appropriate data array based on the selected option
    let selectedData = [];
    switch (selectedOption) {
      case "complaint":
        selectedData = complaintArray;
        break;
      case "cctv":
        selectedData = cctvData;
        break;
      case "vehicle":
        selectedData = mergedData;
        break;
      default:
        selectedData = [];
    }
    // Filter the selected data based on selected status and date range
    const optionFilteredData = selectedData.filter((item) => {
      const statusProperty =
        selectedOption === "complaint" ? item.status.name : item[0]?.status;

      return (
        (!selectedStatus || statusProperty === selectedStatus) &&
        (!selectedDateFrom || item.date >= selectedDateFrom) &&
        (!selectedDateTo || item.date <= selectedDateTo)
      );
    });
    dispatch(filterActions.setFilteredComplaints(optionFilteredData));
  };

  const handleSelectedOption = (event) => {
    setSelectedOption(event.target.value);

    dispatch(filterActions.setDropdownValue(event.target.value));

    if (event.target.value === "cctv") {
      setSelectedStatus("");
    }
  };

  useEffect(() => {
    filterData();
  }, [selectedOption, selectedStatus, selectedDateFrom, selectedDateTo]);

  const clearFilter = () => {
    setSelectedDateFrom("");
    setSelectedDateTo("");
    setSelectedOption("");
    setSelectedStatus("");
  };

  return (
    <div>
      <div
        className={`relative w-96 mt-5 mb-2 flex items-center mx-auto  ${
          opacity
            ? "block translate-y-0 transition-all ease-in-out duration-200"
            : " opacity-0 -translate-y-6"
        } transition-all ease-in-out duration-300 `}
      >
        <input
          type="text"
          className=" w-full  py-2 px-4 focus:outline-none rounded-l-full shadow-xl"
        />
        <BiSearch className="absolute right-14 text-2xl text-gray-500" />
        <button
          className="bg-gray-200 py-3 px-4 rounded-r-full shadow-xl"
          onClick={() => setShowFilter(!showFilter)}
        >
          <BsFilterCircle />
        </button>
      </div>

      <div
        className={`${
          showFilter && opacity ? "block " : "hidden"
        } relative w-96 flex flex-col gap-5 items-center mx-auto p-4 bg-gray-50 rounded-2xl shadow-xl`}
      >
        <div className="w-full flex justify-between">
          <div className="flex flex-col items-start">
            <label htmlFor="dateFrom" className="text-sm">
              From
            </label>
            <input
              type="date"
              className="border-b-2"
              value={selectedDateFrom}
              onChange={(e) => setSelectedDateFrom(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="dateTo" className="text-sm">
              To
            </label>
            <input
              id="dateTo"
              type="date"
              className="border-b-2"
              value={selectedDateTo}
              onChange={(e) => setSelectedDateTo(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex flex-col items-start">
            <select
              className="w-[137px] border-b-2"
              value={selectedOption}
              onChange={handleSelectedOption}
            >
              <option value="">Select Option</option>
              <option value="complaint">Complaint</option>
              <option value="cctv">CCTV</option>
              <option value="vehicle">Vehicle</option>
            </select>
          </div>

          <div className="flex flex-col items-start">
            <select
              className="w-[137px] border-b-2"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              disabled={selectedOption === "cctv"} // Disable the dropdown when "CCTV" is selected
            >
              <option value="">Select Option</option>
              {selectedOption === "complaint" && (
                <>
                  <option value="Resolved">Resolved</option>
                  {/* <option value="In Process">In Process</option> */}
                  <option value="Cancel">Cancel</option>
                  <option value="Closed">Closed</option>
                </>
              )}
              {selectedOption === "cctv" && (
                <>
                  <option value="">Online</option>
                  <option value="">Offline</option>
                </>
              )}
              {selectedOption === "vehicle" && (
                <>
                  <option value="online">online</option>
                  <option value="offline">offline</option>
                  {/* <option value="infence">Infence</option>
                  <option value="outfence">Outfence</option> */}
                </>
              )}
            </select>
            <button onClick={clearFilter}>x</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
