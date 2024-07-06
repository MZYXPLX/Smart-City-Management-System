import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllImages from "../../../../layout/v2/components/Images/AllImages";
import { cctvClinicsActions, clinicsActions } from "../../../../store";
import dummyData from "../../../../data/dummy.json";

const OverlayButton = () => {
  const [isDisable, setISDisable] = useState(false);
  const [isDisablewater, setISDisablewater] = useState(false);
  const [isDisableCamera, setISDisableCamera] = useState(false);
  const [clinicsBgColor, setClinicsBgColor] = useState("bg-white");
  const [filterBgColor, setFilterBgColor] = useState("bg-white");
  const [cameraBgColor, setCameraBgColor] = useState("bg-white");

  const dispatch = useDispatch();
  const cctv = useSelector((state) => state.cctv.items);

  function ClinicsFunc() {
    if (isDisable === false) {
      const clinicsData = dummyData.data.filter(
        (clinic) => clinic.Category === "Clinic"
      );
      dispatch(clinicsActions.update(clinicsData));
      setISDisable(true);
      setClinicsBgColor("bg-gray-300");
    } else {
      const clinicsData = dummyData.data.filter(
        (clinic) => clinic.Category === "Clinic"
      );
      let updatedClinicsData = clinicsData.map((clinic) => ({
        ...clinic,
        Latitude: 0.0,
        Longitude: 0.0,
      }));
      dispatch(clinicsActions.update(updatedClinicsData));
      setISDisable(false);
      setClinicsBgColor("bg-white");
    }
  }

  function FilterFunc() {
    if (isDisablewater === false) {
      const filterData = dummyData.data.filter(
        (filter) => filter.Category === "Water Tank"
      );
      dispatch(clinicsActions.update(filterData));
      setISDisablewater(true);
      setFilterBgColor("bg-gray-300");
    } else {
      const filterData = dummyData.data.filter(
        (filter) => filter.Category === "Water Tank"
      );
      let updatedClinicsData = filterData.map((filter) => ({
        ...filter,
        Latitude: 0.0,
        Longitude: 0.0,
      }));
      dispatch(clinicsActions.update(updatedClinicsData));
      setISDisablewater(false);
      setFilterBgColor("bg-white");
    }
  }

  function CamerasFunc() {
    if (isDisableCamera === false) {
      const camerasData = cctv.filter(
        (cameras) => cameras.category === "Cameras"
      );
      dispatch(cctvClinicsActions.update(camerasData));
      setISDisableCamera(true);
      setCameraBgColor("bg-gray-300");
    } else {
      const camerasData = cctv.filter(
        (cameras) => cameras.category === "Cameras"
      );
      let updatedClinicsData = camerasData.map((camera) => ({
        ...camera,
        latitude: 0.0,
        longitude: 0.0,
      }));
      dispatch(cctvClinicsActions.update(updatedClinicsData));
      setISDisableCamera(false);
      setCameraBgColor("bg-white");
    }
  }

  return (
    <div className="absolute bottom-28 right-20 z-10 flex flex-col gap-5">
      <div
        onClick={ClinicsFunc}
        className={` p-2 flex justify-center items-center cursor-pointer  ${clinicsBgColor} rounded shadow-lg shadow-gray-500 hover:bg-gray-300`}
      >
        <img src={AllImages.medical} alt="" className="w-9 " />
      </div>
      <div
        onClick={FilterFunc}
        className={`p-2 flex justify-center items-center cursor-pointer  ${filterBgColor} rounded shadow-lg shadow-gray-500 hover:bg-gray-300`}
      >
        <img src={AllImages.WaterTank} alt="" className="w-9 " />
      </div>
      <div
        onClick={CamerasFunc}
        className={`p-2 flex justify-center items-center cursor-pointer  ${cameraBgColor} rounded shadow-lg shadow-gray-500 hover:bg-gray-300`}
      >
        <img src={AllImages.cctv} alt="" className="w-9 " />
      </div>
    </div>
  );
};

export default OverlayButton;
