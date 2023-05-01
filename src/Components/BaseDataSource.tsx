import { DataSourceInDB } from "../vizoApi";

export const BaseDataSource = (props: { dataSource: DataSourceInDB }) => {
  const getIconUrl = () => {
    return require(`../Static/images/${props.dataSource.channel_img}.png`);
  };

  return (
    <div className=" bg-white rounded-lg border border-gray-300 p-4 mb-4 flex items-center justify-between">
      <div className="flex items-center">
        <img className="h-8 w-8 mr-4" src={getIconUrl()} alt="icon" />
        <h1 className="text-lg font-medium">{props.dataSource.name}</h1>
      </div>
      <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
        Chat
      </button>
    </div>
  );
};
