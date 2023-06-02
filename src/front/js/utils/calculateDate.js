export function sinceYearStart() {
  const today = new Date();
  const year = today.getFullYear();
  const firstDayOfYear = new Date(year, 0, 1);

  // Get the number of milliseconds in a day
  const oneDay = 24 * 60 * 60 * 1000;

  // Calculate the difference in days between the current date and the first day of the year
  const diffDays = Math.round((today - firstDayOfYear) / oneDay);

  // Calculate the number of full weeks in the current year
  const weeks = Math.floor(diffDays / 7);

  // Calculate the number of months
  const months = today.getMonth() + 1;

  return {
    days: diffDays,
    weeks,
    months,
  };
}

export function CurrentYearStats() {
  const today = new Date();
  const year = today.getFullYear();

  // Check if the current year is a leap year
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const daysInMonth = {
    january: 31,
    february: isLeapYear ? 29 : 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };

  const totalDays = isLeapYear ? 366 : 365;
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = 12;

  return {
    days: totalDays,
    weeks: totalWeeks,
    months: totalMonths,
    daysInMonth: daysInMonth,
  };
}
