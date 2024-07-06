import icon from "./../../../../assets/icon/cctv.jpg";

export default function Item({ item }) {

    return (
        <li className="flex justify-between py-1 bg-slate-300 rounded-xl pr-2 mr-8 mt-2 ">
            <div className="flex ">
                {/* <input
                    className=" h-[1.00rem] w-[1.00rem] flex-auto  my-4 mx-2 items-center justify-center checked:bg-gray-700 appearance-none border-2 border-gray-700"
                /> */}
                <img
                    className="h-12 w-12 flex-none rounded-full scale-75 object-cover bg-slate-800 "
                    src={icon}
                    alt=""
                />
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-bold leading-6 text-gray-800" title={item.Description}>
                        {(item.Description.length > 24) ? item.Description.slice(0, 24) + '...' : item.Description}
                    </p>
                    <p className="mt-1 truncate text-xs  leading-5 float-left border px-1 border-black   text-slate-900 font-semibold bg-slate-200 rounded-lg">
                        {item.phase}
                    </p>
                    <p className="mt-1 ml-1 truncate text-xs  leading-5  float-left border px-1 border-black text-slate-900 font-semibold bg-slate-100 rounded-lg">
                        {item.sector}
                    </p>
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
                {/* {item.status.name === "Resolved" ? (
                    <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">Resolved</p>
                    </div>
                ) : item.status.name === "offline" ? (
                    <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-red-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">Closed</p>
                    </div>
                ) : (
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                        {item.status.name}
                    </p>
                )} */}
                <p className="mt-1 text-xs leading-5 text-blue-500 font-bold" >
                    {item.Category}
                </p>
                <p className="text-sm leading-5 text-gray-500">{(item.sector.length > 7 ) ? item.SubCategory.slice(0,10) : item.SubCategory.slice(0,16)}</p>

            </div>
        </li>
    );
}
