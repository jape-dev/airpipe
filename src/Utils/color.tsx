export const hexWithMoreTransparency = (
  inputHex: string,
  transparencyFactor: number
): string => {
  // Remove any leading '#' from the input hex code
  inputHex = inputHex.replace(/^#/, "");

  // Parse the hex code into RGB components
  const r = parseInt(inputHex.substring(0, 2), 16);
  const g = parseInt(inputHex.substring(2, 4), 16);
  const b = parseInt(inputHex.substring(4, 6), 16);

  // Calculate the new alpha value with more transparency
  const newHex = `rgba(${r}, ${g}, ${b}, ${transparencyFactor})`;

  return newHex;
};
