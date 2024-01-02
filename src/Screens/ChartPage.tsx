// ChartPage.tsx
import React, { useState, useEffect } from "react";
import { Chart } from "../Components/ChartComponent";
import { DefaultService, ChartData } from "../vizoApi";

export const ChartPage: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>();
  const queryParams = new URLSearchParams(window.location.search);
  const chartId = queryParams.get("id");

  useEffect(() => {
    if (chartId !== null) {
      DefaultService.chartDataQueryChartDataGet(chartId)
        .then((response: ChartData) => {
          setChartData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      {chartData && (
        <>
          {chartData.title !== "Add a title" && (
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
              {chartData.title}
            </h3>
          )}
          <Chart
            data={chartData.data.results}
            chartType={chartData.chart_type}
            xAxis={chartData.selected_dimension?.alt_value}
            yAxis={chartData.selected_metric?.alt_value}
            primaryColor={chartData.primary_color}
            secondaryColor={chartData.secondary_color}
            sliceColors={chartData.slice_colors}
            fieldOptions={chartData.field_options}
          />
          {chartData.caption !== "Add caption" && (
            <div className="max-w-2xl mt-2">
              <p className="text-md leading-6 text-gray-500 mb-2">
                {chartData.caption.split(/(?<=\.)\s/).map((sentence, index) => (
                  <React.Fragment key={index}>
                    {sentence}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};
