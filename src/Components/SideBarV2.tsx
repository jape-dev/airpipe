export const SideBar = (props: {}) => {
  return (
    <div className="w-full h-full relative pt-8 pl-4 border-2 bg-gray-200 border-r-neutral-200">
      <div className="flex flex-col items-start">
        <h3 className="my-8 font-bold text-gray-700">Connect</h3>
        <h3 className="my-8 font-bold text-gray-700">Add</h3>
        <h3 className="my-8 font-bold text-gray-700">Transform</h3>
        <h3 className="my-8 font-bold text-gray-700">Export</h3>
        <h3 className="my-9 font-bold text-gray-700">Ask</h3>
      </div>
    </div>
  );
};
