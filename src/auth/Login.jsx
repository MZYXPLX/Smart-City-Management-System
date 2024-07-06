import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  sessionActions,
  geofencesActions,
  devicesActions,
  groupsActions,
  driversActions,
  maintenancesActions,
  calendarsActions,
  categoriesActions,
  cctvActions,
  cmsActions,
  complaintsActions,
  dummyActions,
  clinicsActions,
} from "./../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import data from "./../../src/data/eservices.json";
import cctvData from "./../../src/data/cctv.json";
import complaints from "./../response_complaints.json";
import askari from "./../response_askari.json";
import header from "./../assets/dha-logo.png";
import dummydata from "../../src/data/dummy.json";
import { AiOutlineUser } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import loginBg from "../assets/login-bg.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [emaildata, setemaildata] = useState(null);
  const [passworddata, setpassworddata] = useState(null);

  const [showpassworddata, setShowpassworddata] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [message, setmessage] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const handleShowpassworddata = () => {
    setShowpassworddata(!showpassworddata);
  };

  let token = "";
  // useEffect(() => {
  // }, []);

  // const fetchJsonComplaints = () => {
  //   dispatch(categoriesActions.update(data.data_array));
  // };
  const fetchDummy = () => {
    dispatch(dummyActions.update(dummydata.data));
  };
  const fetchClinics = () => {
    dispatch(clinicsActions.update(dummydata.data));
    console.log("fetchClinics dummydata ----", dummydata.data);
  };

  const fetchCmsComplaints = () => {
    dispatch(cmsActions.update(askari.data_array));
  };
  const fetchJsonAskariComplaints = () => {
    dispatch(complaintsActions.update(complaints.data_array));
  };
  // const fetchCategories = async (token) => {
  //   setIsLoading(true);

  //   var myHeadersx = new Headers();
  //   myHeadersx.append("Content-Type", "application/x-www-form-urlencoded");
  //   myHeadersx.append(
  //     "Access-Control-Allow-Methods",
  //     "POST, PUT, PATCH, GET, DELETE, OPTIONS, get"
  //   );
  //   myHeadersx.append("Access-Control-Allow-ORIGIN", "*");
  //   myHeadersx.append(
  //     "Access-Control-Allow-Headers",
  //     "Origin, Content-Type, X-Auth-Token, Authorization"
  //   );

  //   myHeadersx.append("Authorization", "Bearer " + token);

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeadersx,
  //   };
  //   let response;
  //   await fetch(
  //     "https://eservices.dhai-r.com.pk/api/pims/complaints",
  //     requestOptions
  //   )
  //     .then((res) => (response = res))
  //     .then(() => {})
  //     .catch((error) => console.log("error", error));

  //   if (response.ok) {
  //     const data = await response.json();
  //     // dispatch(geofencesActions.update(await response.json()));
  //   }
  // };
  // const fetchCctv = async (token) => {
  //   setIsLoading(true);

  //   var myHeadersx = new Headers();
  //   myHeadersx.append("Authorization", "Bearer " + token);

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeadersx,
  //   };
  //   let response;
  //   await fetch(
  //     "https://memberappapi.dhai-r.com.pk/api/SurveyData/get",
  //     requestOptions
  //   )
  //     .then((res) => (response = res))
  //     .then(() => {})
  //     .catch((error) => console.log("error", error));

  //   if (response.ok) {
  //     const cctvData = await response.json();
  //     dispatch(cctvActions.update(cctvData.data));
  //     // dispatch(cctvActions.update(cctvData.data));

  //     // dispatch(geofencesActions.update(await response.json()));
  //   }
  // };
  const handlepassworddataLoginCategories = async () => {
    setIsLoading(true);
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append(
        "Cookie",
        "JSESSIONID=node0hdf1ojbi71ys1k5gvbx9ht15919.node0"
      );

      var urlencoded = new URLSearchParams();
      urlencoded.append("emaildata", "admin@live.com");
      urlencoded.append("passworddata", "Admin@123");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded.toString(),
        redirect: "follow",
      };
      // let response;
      // await fetch(
      //   "https://eservices.dhai-r.com.pk/api/pims/login",
      //   requestOptions
      // )
      //   .then((res) => (response = res))

      //   .then(() => {})
      //   .catch((error) => console.log("error", error));
      // if (response.ok) {
      //   const data = await response.json();
      //   // console.log("data categories",data)
      //   fetchJsonComplaints();
      //   fetchCategories(data.data_array.token);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  // const handlePasswordLoginCctv = async () => {
  //   setIsLoading(true);
  //   try {
  //     var myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");
  //     //myHeaders.append("Cookie", "JSESSIONID=node0hdf1ojbi71ys1k5gvbx9ht15919.node0");

  //     var raw = JSON.stringify({
  //       email: "survey@dha.com",
  //       password: "Pakistan@123",
  //     });

  //     var requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };
  //     let response;
  //     await fetch(
  //       "https://memberappapi.dhai-r.com.pk/api/Authenticate/login",
  //       requestOptions
  //     )
  //       .then((res) => (response = res))
  //       .then(() => {})
  //       .catch(() => {});
  //     if (response.ok) {
  //       const data = await response.json();
  //       fetchCctv(data.token);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handlepassworddataLogin = async () => {
    setIsLoading(true);
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("accept", "application/json");
      // myHeaders.append("access-control-allow-credentials", "true");
      //myHeaders.append("Cookie", "JSESSIONID=node0hdf1ojbi71ys1k5gvbx9ht15919.node0");

      var urlencoded = new URLSearchParams();
      urlencoded.append("email", emaildata);
      urlencoded.append("password", passworddata);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
        credentials: "include",
      };
      const response = await fetch(
        "http://65.108.249.139/api/session",
        requestOptions
      );
      // await fetch("http://65.108.249.139/api/session", requestOptions)
      //   .then((res) => (response = res))
      //   .then((res) => {
      //     for (var pair of res.headers.entries()) {
      //    }
      //   })
      if (response.ok) {
        const user = await response.json();

        dispatch(sessionActions.updateUser(user));

        // setTimeout(() => {
        //   const protocol =
        //     window.location.protocol === "https:" ? "wss:" : "ws:";
        //   const socket = new WebSocket(
        //     `${protocol}//vtrackingsys.com:9093/api/socket`
        //   );
        //   socket.onopen = async (event) => {
        //     console.log("SocketOpen");
        //   };

        //   socket.onmessage = async (event) => {
        //     console.log("SocketMessage");
        //     console.log(event.data)
        //   };

        //   socket.onclose = async (event) => {
        //     console.log("SocketClose");
        //   };
        // }, 3000);

        setTimeout(() => {
          toast.success("Logged In Successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }, 2000);
        navigate("/vehicle");
        Cookies.set("token");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGeoFences = async () => {
    setIsLoading(true);

    var myHeadersx = new Headers();
    myHeadersx.append("Content-Type", "application/json");
    myHeadersx.append(
      "Authorization",
      "Basic " + btoa(emaildata + ":" + passworddata)
    );

    var requestOptions = {
      method: "GET",
      headers: myHeadersx,
      redirect: "follow",
    };
    let response;
    await fetch("http://65.108.249.139/api/geofences", requestOptions)
      .then((res) => (response = res))
      .then(() => {})
      .catch((error) => console.log("error", error));

    if (response.ok) {
      dispatch(geofencesActions.update(await response.json()));
    }
  };
  const fetchGroups = async () => {
    setIsLoading(true);

    var myHeadersx = new Headers();
    myHeadersx.append("Content-Type", "application/json");
    myHeadersx.append(
      "Authorization",
      "Basic " + btoa(emaildata + ":" + passworddata)
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

  const fetchDrivers = async () => {
    setIsLoading(true);

    var myHeadersx = new Headers();
    myHeadersx.append("Content-Type", "application/json");
    myHeadersx.append(
      "Authorization",
      "Basic " + btoa(emaildata + ":" + passworddata)
    );

    var requestOptions = {
      method: "GET",
      headers: myHeadersx,
      redirect: "follow",
    };
    let response;
    await fetch("http://65.108.249.139/api/drivers", requestOptions)
      .then((res) => (response = res))
      .then(() => {})
      .catch((error) => console.log("error", error));

    if (response.ok) {
      dispatch(driversActions.update(await response.json()));
    }
  };

  const fetchMaintenance = async () => {
    setIsLoading(true);

    var myHeadersx = new Headers();
    myHeadersx.append("Content-Type", "application/json");
    myHeadersx.append(
      "Authorization",
      "Basic " + btoa(emaildata + ":" + passworddata)
    );

    var requestOptions = {
      method: "GET",
      headers: myHeadersx,
      redirect: "follow",
    };
    let response;
    await fetch("http://65.108.249.139/api/maintenance", requestOptions)
      .then((res) => (response = res))
      .then(() => {})
      .catch((error) => console.log("error", error));
    setIsLoading(false);

    if (response.ok) {
      dispatch(maintenancesActions.update(await response.json()));
    }
  };
  const fetchCalendar = async () => {
    setIsLoading(true);

    var myHeadersx = new Headers();
    myHeadersx.append("Content-Type", "application/json");
    myHeadersx.append(
      "Authorization",
      "Basic " + btoa(emaildata + ":" + passworddata)
    );

    var requestOptions = {
      method: "GET",
      headers: myHeadersx,
      redirect: "follow",
    };
    let response;
    await fetch("http://65.108.249.139/api/calendars", requestOptions)
      .then((res) => (response = res))
      .then(() => {})
      .catch((error) => console.log("error", error));

    if (response.ok) {
      dispatch(calendarsActions.update(await response.json()));
      setIsLoading(false);
    }
  };
  const fetchDevices = async () => {
    setIsLoading(true);

    var myHeadersx = new Headers();
    myHeadersx.append("Content-Type", "application/json");
    myHeadersx.append(
      "Authorization",
      "Basic " + btoa(emaildata + ":" + passworddata)
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

  const fetchPositions = async () => {
    setIsLoading(true);

    var myHeadersx = new Headers();
    myHeadersx.append("Content-Type", "application/json");
    myHeadersx.append(
      "Authorization",
      "Basic " + btoa(emaildata + ":" + passworddata)
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
  const fetchServer = async () => {
    setIsLoading(true);
    var myHeadersx = new Headers();
    myHeadersx.append("Content-Type", "application/json");
    myHeadersx.append(
      "Authorization",
      "Basic " + btoa(emaildata + ":" + passworddata)
    );

    var requestOptions = {
      method: "GET",
      headers: myHeadersx,
      redirect: "follow",
    };
    let response;
    await fetch("http://65.108.249.139/api/server", requestOptions)
      .then((res) => (response = res))
      .then(() => {})
      .catch((error) => console.log("error", error));

    if (response.ok) {
      dispatch(sessionActions.updateServer(await response.json()));
    }
  };
  // const handleComplaintsLogin = async () => {
  //   setIsLoading(true);
  //   try {
  //     var formdata = new FormData();
  //     formdata.append("username", "vtracking_ctt_user@gmail.com");
  //     formdata.append("passworddata", "Admin321");

  //     var requestOptions = {
  //       method: "POST",
  //       body: formdata,
  //       redirect: "follow",
  //     };
  //     let response;
  //     await fetch(
  //       "https://ctt.dhai-r.com.pk/complaint/api/login",
  //       requestOptions
  //     )
  //       .then((res) => (response = res))
  //       .then(() => {})
  //       .catch((error) => console.log("error", error));
  //     if (response.ok) {
  //       const data = await response.json();
  //       // fetchCategories(data.access_token);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handlepassworddata = async () => {
  //   setIsLoading(true);
  //   try {
  //     const url = "https://eservices.dhai-r.com.pk/api/pims/login";
  //     const username = emaildata;
  //     const password = passworddata;

  //     const requestOptions = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Cookie": "JSESSIONID=node0hdf1ojbi71ys1k5gvbx9ht15919.node0",
  //       },
  //       body: JSON.stringify({
  //         username: username,
  //         password: password,
  //       }),
  //       redirect: "follow",
  //     };

  //     const response = await fetch(url, requestOptions);
  //     console.log("response:", response);
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("data=--", data);
  //       const token = data.data_array.token;
  //       console.log("data-----categories", token);
  //       console.log("data=--message", data.message);
  //       setmessage(data.message);

  //       if (token !== undefined) {
  //         // Set the token in a cookie with an expiration time
  //         const expirationDays = 7; // Token will expire in 7 days
  //         Cookies.set("token", token, { expires: expirationDays });
  //       }
  //       const storedToken = Cookies.get("token");
  //       if (storedToken) {

  //         // Token exists, perform navigation or authentication
  //         console.log("Stored token:", storedToken);
  //         // Perform navigation or authentication logic using the token

  //         navigate('/vehiclepage');
  //         toast.success('succefully login!');
  //       } else {

  //         navigate("/")

  //         // Token does not exist, handle the absence of the token

  //         console.log("Token not found in cookies");
  //         setIsLoading(false);
  //       }
  //     } else {
  //       console.log("Login failed");

  //     }
  //   } catch (error) {
  //     console.log(error);
  //     // Handle the error here
  //   }
  // };

  const submit = async (e) => {
    // setDisableButton(true);
    setIsLoading(true);
    try {
      //  handlepassworddata().then(setIsLoading(false)).catch(console.error);
      //  handlePasswordLoginCctv().then(setIsLoading(false)).catch(console.error)
      handlepassworddataLogin().then(setIsLoading(false)).catch(console.error);
      fetchGeoFences().then(setIsLoading(false)).catch(console.error);
      fetchDevices().then(setIsLoading(false)).catch(console.error);
      fetchGroups().then(setIsLoading(false)).catch(console.error);
      fetchDrivers().then(setIsLoading(false)).catch(console.error);
      fetchMaintenance().then(setIsLoading(false)).catch(console.error);
      fetchCalendar().then(setIsLoading(false)).catch(console.error);
      fetchPositions().then(setIsLoading(false)).catch(console.error);
      fetchServer().then(setIsLoading(false)).catch(console.error);
      // fetchJsonComplaints()
      fetchDummy();

      fetchJsonAskariComplaints();
      fetchCmsComplaints();
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      <div className="bg-gray-100 flex flex-row justify-between h-screen w-screen md:px-5 xl:px-20">
        <div className=" md:w-1/2 lg:w-[60%] hidden md:flex items-center h-screen lg:p-10 py-10">
          <img src={loginBg} alt="" className="bg-cover h-full" />
        </div>
        <div className="w-full md:w-1/2 lg:w-[40%] flex flex-col justify-center items-center px-10">
          <div className="mb-4 flex flex-col justify-center items-center">
            <img src={header} className="w-32" alt="" />
            <h1 className="text-3xl text-gray-600">DHA Islamabad</h1>
          </div>
          <p className="text-red-500 mb-1">{message}</p>
          <form className="max-w-md w-full  flex flex-col gap-5">
            <div className="relative w-full">
              <label htmlFor="username">
                <AiOutlineUser className="text-gray-600 absolute left-3 top-3 w-5 h-5 " />
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-3 px-9 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                value={emaildata}
                placeholder="email"
                onChange={(e) => setemaildata(e.target.value)}
              />
            </div>
            <div className="relative w-full">
              <label htmlFor="passworddata">
                <CiLock className="text-gray-600 absolute left-3 top-3 w-5 h-5 " />
              </label>{" "}
              <input
                className="shadow appearance-none border  rounded-full w-full py-3 px-9 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="passworddata"
                type={`${showpassworddata ? "text" : "password"}`}
                value={passworddata}
                placeholder="**********"
                onChange={(e) => setpassworddata(e.target.value)}
              />
              {!showpassworddata ? (
                <FaRegEye
                  className="absolute right-3 top-4 cursor-pointer text-gray-600 w-5 h-5 "
                  onClick={handleShowpassworddata}
                />
              ) : (
                <FaRegEyeSlash
                  className="absolute right-3 top-4 cursor-pointer text-gray-600 w-5 h-5 "
                  onClick={handleShowpassworddata}
                />
              )}
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-2">
              <button
                className="w-full rounded-full bg-[#009B37] hover:bg-[#198840] text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                type="button"
                disabled={disableButton}
                onClick={() => submit()}>
                {isLoading ? (
                  <div
                    class="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
