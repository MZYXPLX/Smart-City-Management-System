import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import dummyLogo from "../../../assets/icon/babies.png";
import { useDispatch, useSelector } from "react-redux";

import OverlayButton from "../components/common/OverlayButton";
import SearchFilter from "../components/common/SearchFilter";

import io from "socket.io-client";

import { ToastContainer, toast } from "react-toastify";
import { BsFillPlayFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import {
  handleToastActions,
  cctvActions,
  sessionActions,
  devicesActions,
  groupsActions,
  geofencesActions,
} from "../../../store";

export default function Aside() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);
  const cctv = useSelector((state) => state.cctv.items);
  const [showTitle, setShowTitle] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    // fetchData();
    // Establish WebSocket connection
    socketRef.current = io("ws://localhost:3000");

    // Listen for WebSocket 'message' event
    socketRef.current.on("dataUpdated", () => {
      //console.log("sdfsdf");
      fetchData();
    });

    // Cleanup function
    return () => {
      // Disconnect WebSocket
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    handlePasswordLoginCctv();
    fetchPositions();
    fetchDevices();
    fetchGroups();
  }, []);

  const fetchData = async () => {
    // setLastMarkerCoords(null);
    try {
      const response = await fetch("http://localhost:5000/api/data");
      const data = await response.json();

      const lastData = data.data[data.data.length - 1];

      // Append the new data to the existing locations state
      setLocations((prevLocations) => [...prevLocations, lastData]);

      //setLastMarkerCoords({ lat: lastData.lat, lng: lastData.lng });

      // alert("New data added");
      toast.error("This is a success message", {
        autoClose: false,
        onClick: () => handleToastClick(lastData),
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleToastClick = (lastData) => {
    dispatch(handleToastActions.update(lastData));
    navigate("/vehiclepage");
    //  setLastMarkerCoords({ lat: lastData.lat, lng: lastData.lng });
    // if (lastMarkerCoords) {
    //   mapRef.current.flyTo(lastMarkerCoords, 10);
    // }
  };

  const handleMouseEnter = () => {
    setOpacity(true);
    setShowFilter(false);
    setShowTitle(true);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpacity(false);
        setShowFilter(false);
        setShowTitle(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const pathname = useLocation().pathname;

  // -------------cctv api--------- //
  const handlePasswordLoginCctv = async () => {
    // setIsLoading(true);
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      //myHeaders.append("Cookie", "JSESSIONID=node0hdf1ojbi71ys1k5gvbx9ht15919.node0");

      var raw = JSON.stringify({
        email: "admin@live.com",
        password: "Admin@123",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      let response;
      await fetch(
        "https://memberappapi.dhai-r.com.pk/api/Authenticate/login",
        requestOptions
      )
        .then((res) => (response = res))
        .then(() => {})
        .catch(() => {});
      if (response.ok) {
        const data = await response.json();
        fetchCctv(data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCctv = async (token) => {
    setIsLoading(true);

    var myHeadersx = new Headers();
    myHeadersx.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "POST",
      headers: myHeadersx,
    };
    let response;
    await fetch(
      "https://memberappapi.dhai-r.com.pk/api/SurveyData/get",
      requestOptions
    )
      .then((res) => (response = res))
      .then(() => {})
      .catch((error) => console.log("error", error));

    if (response.ok) {
      const cctvData = await response.json();
      dispatch(cctvActions.update(cctvData.data));
      dispatch(geofencesActions.update(await response.json()));
    }
  };

  // -------------cctv api--------- //

  const fetchPositions = async () => {
    // setIsLoading(true);

    var myHeadersx = new Headers();
    myHeadersx.append("Content-Type", "application/json");
    myHeadersx.append(
      "Authorization",
      "Basic " + btoa("admin@live.com" + ":" + "Admin@123")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeadersx,
      redirect: "follow",
    };
    let response;
    await fetch("http://65.108.249.139/api/positions", requestOptions)
      .then((res) => (response = res))
      .then(() => {})
      .catch((error) => console.log("error", error));

    if (response.ok) {
      dispatch(sessionActions.updatePositions(await response.json()));
    }
  };

  const fetchDevices = async () => {
    // setIsLoading(true);

    var myHeadersx = new Headers();
    myHeadersx.append("Content-Type", "application/json");
    myHeadersx.append(
      "Authorization",
      "Basic " + btoa("admin@live.com" + ":" + "Admin@123")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeadersx,
      redirect: "follow",
    };
    let response;
    await fetch("http://65.108.249.139/api/devices", requestOptions)
      .then((res) => (response = res))
      .then(() => {})
      .catch((error) => console.log("error", error));

    if (response.ok) {
      dispatch(devicesActions.update(await response.json()));
    }
  };

  const fetchGroups = async () => {
    // setIsLoading(true);

    var myHeadersx = new Headers();
    myHeadersx.append("Content-Type", "application/json");
    myHeadersx.append(
      "Authorization",
      "Basic " + btoa("admin@live.com" + ":" + "Admin@123")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeadersx,
      redirect: "follow",
    };
    let response;
    await fetch("http://65.108.249.139/api/groups", requestOptions)
      .then((res) => (response = res))
      .then(() => {})
      .catch((error) => console.log("error", error));

    if (response.ok) {
      const data = await response.json();
      dispatch(groupsActions.update(data));
      dispatch(groupsActions.addItem(data));
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <aside
          id="default-sidebar"
          className="fixed z-10 transition-transform -translate-x-full  sm:translate-x-0 flex justify-center max-w-[680px] mx-auto"
          aria-label="Sidebar"
          ref={sidebarRef}
        >
          <div className="px-3 mt-3 overflow-y-auto">
            <ul
              className={`z-50 px-3 font-medium bg-gray-50  flex justify-between gap-6 py-2 rounded-2xl `}
              onMouseEnter={handleMouseEnter}
              // onMouseLeave={handleMouseLeave}
            >
              <li>
                <NavLink
                  to="vehiclepage"
                  className={`${
                    pathname === "/" && "bg-blue-300"
                  } min-w-[6.2rem] flex flex-col items-center gap-1 p-2 text-gray-900 rounded-lg  hover:bg-gray-100`}
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span
                    className={` ${
                      showTitle
                        ? "flex translate-y-0 transition-all ease-in-out duration-300"
                        : " -translate-y-full absolute -top-10 opacity-0 transition-all ease-in-out duration-300"
                    }`}
                  >
                    Home
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="vehiclepage"
                  className={`${
                    pathname === "/vehiclepage" && "bg-blue-300"
                  } min-w-[6.2rem] flex flex-col items-center gap-1 p-2 text-gray-900 rounded-lg  hover:bg-gray-100 `}
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <span
                    className={` ${
                      showTitle
                        ? "flex translate-y-0 transition-all ease-in-out duration-300"
                        : " -translate-y-full absolute -top-10 opacity-0 transition-all ease-in-out duration-300"
                    }`}
                  >
                    Vehicle
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="eservicespage"
                  className={`${
                    pathname === "/eservicespage" && "bg-blue-300"
                  } min-w-[6.2rem] flex flex-col items-center gap-1 p-2 text-gray-900 rounded-lg  hover:bg-gray-100 `}
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span
                    className={` ${
                      showTitle
                        ? "flex translate-y-0 transition-all ease-in-out duration-300"
                        : " -translate-y-full absolute -top-10 opacity-0 transition-all ease-in-out duration-300"
                    }`}
                  >
                    Complaint
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="cctvpage"
                  className={`${
                    pathname === "/cctvpage" && "bg-blue-300"
                  } min-w-[6.2rem] flex flex-col items-center gap-1 p-2 text-gray-900 rounded-lg  hover:bg-gray-100 `}
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span
                    className={` ${
                      showTitle
                        ? "flex translate-y-0 transition-all ease-in-out duration-300"
                        : " -translate-y-full absolute -top-10 opacity-0 transition-all ease-in-out duration-300"
                    }`}
                  >
                    CCTV
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="dummypage"
                  className={`${
                    pathname === "/dummypage" && "bg-blue-300"
                  } min-w-[6.2rem] flex flex-col items-center gap-1 p-2 text-gray-900 rounded-lg  hover:bg-gray-100 `}
                >
                  <img
                    src={dummyLogo}
                    alt=""
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                  />
                  <span
                    className={` ${
                      showTitle
                        ? "flex translate-y-0 transition-all ease-in-out duration-300"
                        : " -translate-y-full absolute -top-10 opacity-0 transition-all ease-in-out duration-300"
                    }`}
                  >
                    DUMMY
                  </span>
                </NavLink>
              </li>
            </ul>
            <SearchFilter
              opacity={opacity}
              showFilter={showFilter}
              setShowFilter={setShowFilter}
            />
          </div>
        </aside>
        <OverlayButton />
      </div>
      <Outlet />
    </>
  );
}
