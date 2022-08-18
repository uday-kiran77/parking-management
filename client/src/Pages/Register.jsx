import { useContext, useEffect, useState } from "react";
import { RegisterForm } from "../components/User/RegisterForm";

import { validateForm } from "../utils/formUtils";
import AuthContext from "../Store/auth-context";
import { Layout } from "../Layout/Layout";

import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Notification } from "../components/Notification/Notification";

const axios = require("axios").default;

const Register = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const defaultFormState = {
    email: "",
    password: "",
    fName: "",
    lName: "",
    phone: "",
    error: "",
    loading: false,
  };
  const [form, setForm] = useState(defaultFormState);

  useEffect(() => {
    if (form.error !== "")
      Notification({
        title: "Error!",
        message: form.error,
        color: "red",
        icon: <AiOutlineClose />,
      });
  }, [form.error]);

  const setFormLoading = () => {
    setForm((prevState) => {
      return { ...prevState, loading: !prevState.loading };
    });
  };
  const resetFormError = () => {
    setForm((prevState) => {
      return { ...prevState, error: "" };
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    resetFormError();
    setFormLoading();
    var formValid = await validateForm(form);
    if (formValid.status === "error") {
      setForm((prevState) => {
        return { ...prevState, error: formValid.error };
      });

      setFormLoading();
      return;
    }
    const userData = {
      email: form.email,
      fName: form.fName,
      lName: form.lName,
      password: form.password,
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_BASE_URL}/register`, userData)
      .then((response) => {
        // console.log(response);
        Notification({
          title: "Registered Successfully",
          message: "Please Login",
          color: "green",
          icon: <BsCheckLg />,
        });
        navigate("/login");
        setFormLoading();
      })
      .catch((e) => {
        if (e.response.status === 400 || e.response.status === 401) {
          // console.log(e.response.data);
          setForm((prevState) => {
            return { ...prevState, error: e.response.data.message };
          });
        }
        setFormLoading();
      });
  };

  return (
    <Layout>
      <RegisterForm
        form={form}
        setForm={setForm}
        registerHandler={registerHandler}
      />
    </Layout>
  );
};

export default Register;
