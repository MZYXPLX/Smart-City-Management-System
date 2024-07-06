import AllImages from "../Images/AllImages";


export default function Complaint({ item, checkedItems, setCheckedItems }) {

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.value]: event.target.checked,
    });
  };

  return (
    <li className="flex justify-between py-1 bg-slate-300 rounded-xl pr-2 mr-8 mt-2 ">
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
          src={item.category === "Cameras"
          ? AllImages.cctv
          : item.category === "Gates"
            ? AllImages.cctv
            : item.category === "Water Tanks"
              ? AllImages.cctv
              : item.category === "Other"
                ? AllImages.cctv
                : item.category === "Control Room"
                  ? AllImages.cctv
                  : AllImages.cctv}
          alt=""
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-bold leading-6 text-gray-800">
            {(item.description.substring(item.description.indexOf(" ") + 1).length > 20) ? item.description.substring(item.description.indexOf(" ") + 1).slice(0, 20) + '...' : item.description.substring(item.description.indexOf(" ") + 1)}
          </p>
          <p className="mt-1 w-36 truncate text-xs  leading-5 text-black float-left border px-1 border-black bg-white">
            {item.description}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        {item.username === "Resolved" ? (
          <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs leading-5 text-gray-500">Resolved</p>
          </div>
        ) : item.username === "offline" ? (
          <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-red-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
            </div>
            <p className="text-xs leading-5 text-gray-500">Closed</p>
          </div>
        ) : (
          <p className="mt-1 text-xs leading-5 text-gray-500">
            {item.username}
          </p>
        )}

      </div>
    </li>
  );
}
