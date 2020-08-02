export const checkValidity = (value, rule) => {
  let isValid = true;
  if (rule.required) {
    isValid = value !== "" && isValid;
  }

  if (rule.minLength) {
    isValid = value.trim().length >= rule.minLength && isValid;
  }

  if (rule.maxLength) {
    isValid = value.trim().length <= rule.maxLength && isValid;
  }

  if (rule.isEmail) {
    const pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    isValid = pattern.test(value) && isValid;
  }

  if (rule.isNumeric) {
    const pattern = /^\d+$/i;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
