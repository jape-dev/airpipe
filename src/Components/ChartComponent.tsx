import React, { useEffect, useState } from "react";
import { FieldOption } from "../vizoApi";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Label,
  TooltipProps,
  Legend,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { getIconUrl } from "../Utils/image";

interface ChartProps {
  data: { [key: string]: any }[];
  chartType: string;
  xAxis?: string;
  yAxis?: string;
  primaryColor: string;
  secondaryColor: string;
  sliceColors: string[];
  fieldOptions: FieldOption[];
}

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  data: { [key: string]: any }[];
  fieldOptions: FieldOption[];
  xAxis?: string;
  chartType: string;
}

interface RenderCustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  data,
  fieldOptions,
  xAxis,
  chartType,
}: CustomTooltipProps) => {
  useEffect(() => {
    console.log(xAxis);
  }, [xAxis]);

  if (active && payload?.length && payload?.length > 0) {
    const dataKey = payload[0].dataKey;

    // const currentValue = payload[0].value?.valueOf();

    if (!dataKey || !data || !fieldOptions || !xAxis) return null;
    const dataKeyFieldOption = fieldOptions.find((option: FieldOption) => {
      return option.alt_value === dataKey;
    });

    // Find the index position in data of tje key dataKey
    const currentIndex = data.findIndex((item) => item === payload[0].payload);
    const previousIndex = currentIndex - 1;
    const previousValue = data[previousIndex]?.[dataKey];
    const currentValue = data[currentIndex]?.[dataKey];
    const previousLabel = data[previousIndex]?.[xAxis];
    const currentLabel = data[currentIndex]?.[xAxis];

    let percentageChangeString = (
      ((currentValue - previousValue) / previousValue) *
      100
    )
      .toFixed(2)
      .toString();
    const percentageChange = parseFloat(
      percentageChangeString === "Infinity" ? "0" : percentageChangeString
    );

    return (
      <div className="custom-tooltip bg-white border-gray-300 border rounded py-2 shadow-md">
        <div className="grid grid-cols-1 gap-1">
          <div className="col-span-1 px-4 flex items-center mt-1">
            {dataKeyFieldOption && (
              <>
                <img
                  src={getIconUrl(
                    dataKeyFieldOption.img ? dataKeyFieldOption.img : ""
                  )}
                  className="w-4 h-4 mr-2 flex-shrink-0"
                />
                <span className="text-sm">{dataKeyFieldOption.label}</span>
              </>
            )}
          </div>
          <p className="col-span-1 px-4 text-lg font-bold">
            {payload[0].value}
          </p>
          {previousValue !== undefined && (
            <div className="col-span-1 px-4 flex items-center">
              <p
                className={
                  percentageChange < 0
                    ? " text-sm text-red-500"
                    : "text-sm text-green-500"
                }
              >
                {percentageChange < 0
                  ? `${percentageChange}%`
                  : `+${percentageChange}%`}
              </p>
              <p className="ml-2 text-sm text-gray-600">{`vs ${previousLabel}`}</p>
            </div>
          )}
          <hr className="border-gray-300" />
          <div className="col-span-1 px-4">
            <p className="text-sm text-gray-600">
              {label ? `${label}` : `${payload[0].name}`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: RenderCustomizedLabelProps): JSX.Element => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const Chart: React.FC<ChartProps> = ({
  data,
  chartType,
  xAxis,
  yAxis,
  primaryColor,
  secondaryColor,
  sliceColors,
  fieldOptions,
}) => {
  const value = yAxis ? yAxis : "value";
  const renderChart = () => {
    chartType = chartType.toLowerCase();
    switch (chartType) {
      case "bar":
        return (
          <BarChart width={600} height={350} data={data}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey={xAxis} />
            <YAxis dataKey={yAxis} />
            <Label />
            <Tooltip
              cursor={{ fill: secondaryColor }}
              content={
                <CustomTooltip
                  data={data}
                  fieldOptions={fieldOptions}
                  xAxis={xAxis}
                  chartType={chartType}
                />
              }
            />
            <Bar dataKey={value} fill={primaryColor} radius={[5, 5, 0, 0]} />
          </BarChart>
        );
      case "line":
        return (
          <LineChart width={600} height={350} data={data}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey={xAxis} />
            <YAxis dataKey={yAxis} />
            <Tooltip
              cursor={{ fill: secondaryColor }}
              content={
                <CustomTooltip
                  data={data}
                  fieldOptions={fieldOptions}
                  xAxis={xAxis}
                  chartType={chartType}
                />
              }
            />
            <Line dataKey={value} stroke={primaryColor} />
          </LineChart>
        );
      case "pie":
        return (
          <PieChart width={600} height={350}>
            <Legend layout="horizontal" verticalAlign="top" align="center" />
            <Pie
              data={data}
              dataKey={value}
              nameKey={xAxis}
              cx="50%"
              cy="50%"
              fill="#8884d8"
              // label={renderCustomizedLabel}
              label
            >
              {/* <LabelList
                dataKey={value}
                position="right"
                style={{ fontSize: "10px", color: "black" }}
              /> */}
              {sliceColors.map((color: any, index: number) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip
              cursor={{ fill: secondaryColor }}
              content={
                <CustomTooltip
                  data={data}
                  fieldOptions={fieldOptions}
                  xAxis={xAxis}
                  chartType={chartType}
                />
              }
            />
            {/* <Legend /> */}
          </PieChart>
        );
      case "funnel":
        return (
          <ComposedChart width={600} height={350} data={data}>
            <XAxis dataKey={xAxis} />
            <YAxis dataKey={yAxis} />
            <Tooltip
              cursor={{ fill: secondaryColor }}
              content={
                <CustomTooltip
                  data={data}
                  fieldOptions={fieldOptions}
                  xAxis={xAxis}
                  chartType={chartType}
                />
              }
            />
            <CartesianGrid stroke="#f5f5f5" />
            <Area
              dataKey={value}
              fill={secondaryColor}
              stroke={secondaryColor}
            />
            <Bar dataKey={value} fill={primaryColor} radius={[5, 5, 0, 0]} />
          </ComposedChart>
        );
    }
  };

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <div>{renderChart()}</div>
    </ResponsiveContainer>
  );
};

export default Chart;
