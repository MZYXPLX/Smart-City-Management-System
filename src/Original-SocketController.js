import { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { devicesActions, sessionActions } from "./store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import iconx from "./assets/icon/offroad.svg";
import { useNavigate } from "react-router-dom";

const logoutCode = 4000;

const SocketController = () => {
  const authenticated = useSelector((state) => !!state.session.user);
  // const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buffer, setBuffer] = useState([]);
  const bufferSize = 40; // set the buffer size to 10 items

  const socketRef = useRef();
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const socket = new WebSocket(`${protocol}//vtrackingsys.com:9093/api/socket`);
  socketRef.current = socket;
  const CustomToastWithLink = () => (
    <div>
      <h1>Security Vehicle Damage Alert</h1>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => navigate('/details')}
      >
        View Details
      </button>
    </div>
  );
  useEffect(() => {
    const connectSocket = () => {
      socket.onopen = async (event) => {
        dispatch(sessionActions.updateSocket(true));
      };
      socket.onclose = async (event) => {
      };
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.devices) {
          dispatch(devicesActions.update(data.devices));
        }
        if (data.positions) {
          dispatch(sessionActions.updatePositions(data.positions));
        }
      };
    };

    setTimeout(() => {
      toast.error(CustomToastWithLink, {
        icon: "🔥",
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      connectSocket();
    }, 5000);
  }, [socket]);
};

export default connect()(SocketController);
