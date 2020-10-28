import React from "react";
import ReactDatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
const Testform = () => {
  const { handleSubmit, control } = useForm();
  const onSubmit = (registerData) => {
    console.log(registerData);
  };

  const availableDays = [1, 3, 5];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="date"
        render={(props) => {
          console.log("ReactDatePicker props", props);
          return (
            <ReactDatePicker
              className="form-control"
              filterDate={(date) => {
                const day = date.getDay();
                return availableDays.indexOf(day) > -1;
                //return day !== 0 && day !== 6;
              }}
              onChange={props.onChange}
              onBlur={props.onBlur}
              selected={props.value}
              dateFormat="yyyy-MM-dd"
            />
          );
        }}
      />

      <input type="submit" />
    </form>
  );
};

export default Testform;
