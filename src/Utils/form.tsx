import { FieldOption } from "../vizoApi";
import { DropDownOption } from "../Components/DropDown";

export const fieldOptionsToDropDownOptions = (fieldOptions: FieldOption[]) => {
  // map fieldOptions into an array of DropDownOption. Make the type DropDownOption
  const dropDownOptions: DropDownOption[] = fieldOptions.map((option) => {
    return {
      name: option.label,
      img: option.img,
    };
  });
  return dropDownOptions;
};

export const fieldOptionToDropDownOption = (
  fieldOption: FieldOption | undefined
) => {
  // map fieldOptions into an array of DropDownOption. Make the type DropDownOption
  if (!fieldOption) {
    return undefined;
  }
  const dropDownOption: DropDownOption = {
    name: fieldOption.label,
    img: fieldOption.img,
  };

  return dropDownOption;
};
