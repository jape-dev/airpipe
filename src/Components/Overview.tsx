import React from "react";

export const Overview = () => {
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Overview
        </h3>
        <p className="mt-1 max-w text-sm leading-5 text-gray-500">
          AirPipe lets you import data from a variety of sources, transform it
          without using any code, and export it to a variety of destinations.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 px-4 sm:px-6">
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <h3 className="text-md leading-6 font-medium text-gray-900">
            Import
          </h3>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            Get started by connecting to your data sources and selecting which
            data points you want to import.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <h3 className="text-md leading-6 font-medium text-gray-900">
            Transform
          </h3>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            Use natural language prompts to describe how you want to combine,
            slice and dice your data. Our GPT powered AI will convert your
            prompt into SQL for you, which you can also edit as you wish. You
            can chain multiple prompts together to create a pipeline.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <h3 className="text-md leading-6 font-medium text-gray-900">
            Export
          </h3>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            Once you are happy with your data, export it as a csv file which you
            can then use to load into your destination of choice.
          </p>
        </div>
      </div>
      <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
        <div className="aspect-w-16 aspect-h-9">
          {/* Placeholder for video embed */}
        </div>
      </div>
    </div>
  );
};
