import Joi from "joi";

export const formSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  fName: Joi.string().alphanum().max(20).required(),
  lName: Joi.string().alphanum().max(20).required(),
  phone: Joi.string().alphanum().min(10).max(15).allow(null, ""),
  password: Joi.string().min(6).required(),
});

export const validateForm = async (form) => {
  try {
    await formSchema.validateAsync(
      {
        email: form.email,
        fName: form.fName,
        lName: form.lName,
        phone: form.phone,
        password: form.password,
      },
      { abortEarly: false }
    );
    return { status: "ok" };
  } catch (e) {
    e = formatError(String(e));
    return { status: "error", error: e };
  }
};

const formatError = (e) => {
  console.log(e);
  var error = [];
  if (e.includes("must be a valid email")) {
    error.push("Invalid Email Address");
  }
  if (e.includes('"password" length must be at least 6 characters long')) {
    error.push("Password must be above 6 characters");
  }
  if (e.includes('"phone" length must be at least 10 characters long')) {
    error.push("Invalid Mobile Number");
  }

  if (error.length > 0) error = error.join(", ");

  return error;
};
