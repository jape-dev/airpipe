import React, { useState } from "react";

export const BaseConnector = (props: {
  title: string;
  imgPath: string;
  onConnect: () => void;
  connected: boolean;
}) => {
  const getIconUrl = () => {
    return require(`../Static/images/${props.imgPath}.png`);
  };

  return (
    <div className=" bg-white rounded-lg border border-gray-300 p-4 mb-4 flex items-center justify-between">
      <div className="flex items-center">
        <img className="h-8 w-8 mr-4" src={getIconUrl()} alt="icon" />
        <h1 className="text-lg font-medium">{props.title}</h1>
      </div>
      {props.connected ? (
        <p>Connected</p>
      ) : (
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          onClick={props.onConnect}
        >
          Connect
        </button>
      )}
    </div>
  );
};
