const messages = {
  first_name: {
    required: "First name is required",
    minLength: "First name must be at least 2 characters",
    maxLength: "First name must be at most 50 characters",
  },
  last_name: {
    required: "Last name is required",
    minLength: "Last name must be at least 2 characters",
    maxLength: "Last name must be at most 50 characters",
  },
  email: {
    required: "Email is required",
    invalid: "Invalid email address",
  },
  username: {
    required: "Username is required",
    minLength: "Username must be at least 7 characters",
    maxLength: "Username must be at most 20 characters",
  },
  id_company: {
    required: "Company is required",
  },
  password: {
    required: "Password is required",
    minLength: "Password must be at least 8 characters",
    maxLength: "Password must be at most 50 characters",
  },
  confirmPassword: {
    required: "Confirm Password is required",
    notMatch: "Passwords must match",
  },
  companyName: {
    required: "Company Name is required",
    minLength: "Company Name must be at least 3 characters long",
  },
  email: {
    invalid: "Invalid email format",
    required: "Email is required",
  },
  phone: {
    digitsOnly: "Phone number must be digits only",
    minLength: "Phone number must be at least 10 digits",
    maxLength: "Phone number cannot exceed 15 digits",
    required: "Phone is required",
  },
  address: {
    required: "Address is required",
  },
  state: {
    required: "Province is required",
  },
  city: {
    required: "City is required",
  },
  zipCode: {
    digitsOnly: "Zip Code must be digits only",
    minLength: "Zip Code must be at least 5 digits",
    maxLength: "Zip Code cannot exceed 10 digits",
    required: "Zip Code is required",
  },
  joiningDate: {
    required: "Joining Date is required",
    max: "Joining Date cannot be in the future",
  },
  file: {
    required: "Field must not be empty",
    size: "Max photo's size is 2MB",
    format: "Format must be .jpg/.jpeg/.png",
  },
};

export default messages;
