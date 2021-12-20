import validator from "validator";
import { convertDateToString } from "./DateUtils";
const validateLoginData = (data, error, setError) => {
  const newError = {};
  var isValidated = true;
  if (!validator.isEmail(data.email)) {
    newError.email = "Vui lòng nhập đúng định dạng email!";
    isValidated = false;
  }
  if (
    !validator.isStrongPassword(data.password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 0,
      pointsPerRepeat: 0,
      pointsForContainingLower: 0,
      pointsForContainingUpper: 0,
      pointsForContainingNumber: 0,
      pointsForContainingSymbol: 0,
    })
  ) {
    isValidated = false;
    newError.password =
      "Mật khẩu có độ dài tối thiểu 8, yêu cầu ít nhất 1 kí tự thường, 1 kí tự hoa và 1 kí tự đặc biệt!";
  }

  setError({
    ...error,
    ...newError,
  });
  return isValidated;
};

const validateSignupData = (data, error, setError) => {
  const newError = {};
  var isValidated = true;
  if (!validator.isEmail(data.email)) {
    newError.email = "Vui lòng nhập đúng định dạng email!";
    isValidated = false;
  }
  if (
    !validator.isStrongPassword(data.password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 0,
      pointsPerRepeat: 0,
      pointsForContainingLower: 0,
      pointsForContainingUpper: 0,
      pointsForContainingNumber: 0,
      pointsForContainingSymbol: 0,
    })
  ) {
    isValidated = false;
    newError.password =
      "Mật khẩu có độ dài tối thiểu 8, yêu cầu ít nhất 1 kí tự thường, 1 kí tự hoa và 1 kí tự đặc biệt!";
  }
  if (validator.isEmpty(data.fullName)) {
    isValidated = false;
    newError.fullName = "Tên không được để trống!";
  }
  if (validator.isEmpty(data.address)) {
    isValidated = false;
    newError.address = "Địa chỉ không được để trống!";
  }
  if (
    !validator.isNumeric(data.phoneNumber) ||
    !validator.isLength(data.phoneNumber, { min: 10, max: 11 })
  ) {
    isValidated = false;
    newError.phoneNumber = "SDT là chữ số có độ dài từ 10-111";
  }
  if (validator.isDate(convertDateToString(data.birthday))) {
    isValidated = false;
    newError.birthday = "Vui lòng nhập đúng định dạng ngày sinh!";
  }
  setError({
    ...error,
    ...newError,
  });
  return isValidated;
};
export { validateLoginData, validateSignupData };
