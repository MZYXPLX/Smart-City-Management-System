import moment from "moment";
import iconDefault from "./../../../../assets/icon/default.svg";
import iconCar from "./../../../../assets/icon/car.svg";
import iconBike from "./../../../../assets/icon/bike.svg";
import iconOffroad from "./../../../../assets/icon/offroad.svg";
import iconVan from "./../../../../assets/icon/van.svg";
import iconPickup from "./../../../../assets/icon/pickup.svg";
import iconTruck from "./../../../../assets/icon/truck.svg";
import iconBus from "./../../../../assets/icon/bus.svg";
import iconTractor from "./../../../../assets/icon/tractor.svg";
export default function Device({ item, checkedItems, setCheckedItems }) {
  
  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.value]: event.target.checked,
    });
  };

  return ( 
    <li key={item.name} className="flex justify-between py-1 ">
      <div className="flex ">
        <input
          className=" h-[1.00rem] w-[1.00rem] flex-auto  my-4 mx-2 items-center justify-center checked:bg-gray-700 appearance-none border-2 border-gray-700"
          type="checkbox"
          value={item.id}
          id={item.id}
          checked={checkedItems[item.id]}
          onChange={handleChange}
        />
        <img
          className="h-12 w-12 flex-none rounded-full scale-75 object-cover "
          src={
            item.category === "Car"
              ? iconCar
              : item.category === "Motorcycle"
              ? iconBike
              : item.category === "Offroad"
              ? iconOffroad
              : item.category === "Van"
              ? iconVan
              : item.category === "pickup" || "Pickup" 
              ? iconPickup
              : item.category === "Truck"
              ? iconTruck
              : item.category === "Bus"
              ? iconBus
              : item.category === "Tractor"
              ? iconTractor
              : iconDefault
          }
          alt=""
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-bold leading-6 text-gray-800">
            {(item.name.substring(item.name.indexOf(" ") + 1).length > 20 ) ? item.name.substring(item.name.indexOf(" ") + 1).slice(0,20) +'...' : item.name.substring(item.name.indexOf(" ") + 1)}
          </p>
          <p className="mt-1 truncate text-xs  leading-5 text-black float-left border px-1 border-black bg-white">
            {item.name.substring(0, item.name.indexOf(" "))}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-blue-500 font-semibold">{(item.category) ? item.category : 'unknown'}</p>
        {item.status === "online" ? (
          <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs leading-5 text-gray-500">Online</p>
          </div>
        ) : item.status === "offline" ? (
          <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-red-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
            </div>
            <p className="text-xs leading-5 text-gray-500">Offline</p>
          </div>
        ) : (
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Last seen{" "}
            <time dateTime={item.lastUpdate}>
              {moment(item.lastUpdate).fromNow()}
            </time>
          </p>
        )}
      </div>
    </li>
  );
}
