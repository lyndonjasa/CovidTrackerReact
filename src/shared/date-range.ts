interface DateRange {
  range: string;
  icon: string;
};

const LAST_SEVEN_DAYS: DateRange = {
  range: 'Last Seven Days',
  icon: '7'
};
const ALL_TIME: DateRange = {
  range: 'All Time',
  icon: '&infin;'
};
const TODAY: DateRange = {
  range: 'Today',
  icon: 'T'
};
const MONTH: DateRange =  {
  range: 'Month',
  icon: 'M'
};
const YEAR: DateRange = {
  range: 'Year',
  icon: 'Y'
};
const CUSTOM_DATE: DateRange = {
  range: 'Custom Date',
  icon: 'S'
};

export {
  LAST_SEVEN_DAYS,
  ALL_TIME,
  TODAY,
  MONTH,
  YEAR,
  CUSTOM_DATE
};
