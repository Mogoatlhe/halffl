const get_two_digit_date = (date_number: number) => {
  const num_of_digits = date_number.toString().length;
  const two_digit_month_num =
    num_of_digits === 1 ? `0${date_number}` : date_number;
  return two_digit_month_num;
};

export default get_two_digit_date;
