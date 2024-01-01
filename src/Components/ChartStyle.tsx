import React, { useState, useEffect } from "react";
import { ChromePicker, Color, ColorChangeHandler } from "react-color";
import { hexWithMoreTransparency } from "../Utils/color";
import { palettes, Palette } from "../Static/Colors/piePalettes";
import { PaletteDropdown } from "./DropDown";

export interface ChartStyleProps {
  options: string[];
  chartType: string;
  primaryColor: string;
  setPrimaryColor: React.Dispatch<React.SetStateAction<string>>;
  secondaryColor: string;
  setSecondaryColor: React.Dispatch<React.SetStateAction<string>>;
  sliceColors: string[];
  setSliceColors: React.Dispatch<React.SetStateAction<string[]>>;
  limit: number;
}

export const ChartStyle: React.FC<ChartStyleProps> = ({
  options,
  chartType,
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
  sliceColors,
  setSliceColors,
}) => {
  const [selectedComponent, setSelectedComponent] = useState<string>();
  const [showColorPicker, setShowColorPicker] = useState<boolean>(true);
  const [selectedColor, setSelectedColor] = useState<Color>("#47d8b4");
  const [selectedSliceIndex, setSelectedSliceIndex] = useState<number>(0);
  const [selectedPalette, setSelectedPalette] = useState<Palette>();

  const handlePaletteChange = (palette: Palette) => {
    setSelectedPalette(palette);
    setSliceColors(palette.colors);
  };

  const handleColourChange: ColorChangeHandler = (color) => {
    setSelectedColor(color.hex);
    return color;
  };

  const handleSelectedSliceClick = (index: number) => {
    setShowColorPicker(!showColorPicker);
    setSelectedSliceIndex(index);
  };

  useEffect(() => {
    const primary = selectedColor.toString();
    const secondary = hexWithMoreTransparency(primary, 0.3);
    // change the opacity to 50%
    if (chartType === "bar") {
      setPrimaryColor(primary);
      setSecondaryColor(secondary);
    } else if (chartType === "line") {
      setPrimaryColor(primary);
      setSecondaryColor(secondary);
    } else if (chartType === "funnel") {
      setPrimaryColor(primary);
      setSecondaryColor(secondary);
    } else if (chartType === "pie") {
      sliceColors[selectedSliceIndex] = selectedColor.toString();
      const sliceColorsCopy = [...sliceColors];
      setSliceColors(sliceColorsCopy);
    }
  }, [selectedColor]);

  return (
    <>
      <h3 className="text-md leading-6 font-medium text-gray-900 mb-2">
        Customise style
      </h3>

      <div className="border boder-gray-200 rounded-md mt-0 w-full p-4">
        <h4 className="text-md leading-6 font-medium text-gray-900 mb-2">
          Colours
        </h4>
        {chartType === "pie" && (
          <>
            <PaletteDropdown
              options={palettes}
              onSelectOption={handlePaletteChange}
              defaultOption={palettes[0]}
            />
            <div className="mb-5 border border-gray-400 rounded-md p-2 flex justify-center">
              <div className="grid grid-cols-5 gap-6">
                {sliceColors.map((color, index) => (
                  <button
                    onClick={() => {
                      handleSelectedSliceClick(index);
                    }}
                    key={index}
                    className="w-5 h-5 rounded-full "
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            </div>
          </>
        )}
        {showColorPicker && (
          <div className="flex justify-center">
            <ChromePicker
              styles={{
                default: {
                  picker: {
                    borderRadius: "5px", // Set the border-radius for rounded corners
                    border: "1px solid #cbd5e0", // Set the border
                    boxShadow: "none", // Remove the shadow
                    width: "100%", // Set the width to full
                  },
                },
              }}
              color={selectedColor}
              onChange={handleColourChange}
              // onChangeComplete={() => setShowColorPicker(false)}
            />
          </div>
        )}
      </div>
    </>
  );
};
