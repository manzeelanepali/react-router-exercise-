import { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const resetField = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    resetField,
  };
};

export default useField;
