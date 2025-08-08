import Holidays from "date-holidays"

export const getHolidaysForYears = (years: number[], country: string) => {
  const hd = new Holidays(country);

  return years.flatMap(year => {
    const list = hd.getHolidays(year) ?? [];
    return list.map(h => ({
      ...h,
      country,
    }));
  });
};