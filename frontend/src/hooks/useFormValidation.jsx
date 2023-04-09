import { useState } from 'react';

function useFormValidation() {
  const [valuesObj , setValueObj] = useState({});
  const [errorMessageObj, setErrorMessageObj] = useState({});
  const [isValid, setIsValid] = useState(true);

  function handleChange(evt) {
    const {name, value, validationMessage} = evt.target;
    setValueObj({...valuesObj, [name]: value});
    setErrorMessageObj({...errorMessageObj, [name]: validationMessage});
    setIsValid(evt.target.closest('form').checkValidity());
  }

  function resetValidation() {
    setValueObj({});
    setErrorMessageObj({});
    setIsValid(false);
  }

  return {
    valuesObj, 
    setValueObj, 
    errorMessageObj, 
    isValid, 
    handleChange, 
    resetValidation}
}

export default useFormValidation;