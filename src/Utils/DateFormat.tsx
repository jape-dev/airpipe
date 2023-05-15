export const DateToString = (date: Date) => {
  const year: number = date.getFullYear(); // get the year as a number
  const month: number = date.getMonth() + 1; // get the month as a number (adding 1 since getMonth() returns 0-indexed values)
  const day: number = date.getDate(); // get the day as a number
  const formattedDate: string = `${year}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

  return formattedDate;
};
