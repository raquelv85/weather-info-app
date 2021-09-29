import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => setValues(initialState);

  const handleInputChange = ({ target }) => {
    console.log("ddd", target.value)
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };
  console.log("ddd", values)
  return [values, handleInputChange, reset];
};
