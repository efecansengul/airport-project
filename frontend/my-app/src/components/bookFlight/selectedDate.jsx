import { forwardRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./bookFlight.module.css";
import calendar from "../../assets/image/calendar.png";
const DateSelect = forwardRef(({ selectedDate, onChange, className }, ref) => {
  const today = new Date();
  return (
    <div className={styles.datePickerContainer}>
      <img src={calendar} alt="calendar pic" className={styles.icon} />
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        ref={ref}
        className={`${styles.customDateInput} ${className}`}
        placeholderText="Tarih Seçiniz"
        minDate={today}
        maxDate={today}
        required
      />
    </div>
  );
});
export default DateSelect;
