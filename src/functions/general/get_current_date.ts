import get_two_digit_date from "./get_two_digit_date";

const get_current_date = () => {
  const date = new Date();
  const month_number = date.getMonth() + 1;
  const two_digit_month_num = get_two_digit_date(month_number);
  const two_digit_day_num = get_two_digit_date(date.getDate());
  return `${date.getFullYear()}-${two_digit_month_num}-${two_digit_day_num}`;
};

export default get_current_date;
