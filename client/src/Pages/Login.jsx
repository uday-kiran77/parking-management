import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Alert,
  Button,
  Group,
  Divider,
} from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import AuthContext from "../Store/auth-context";
import { Layout } from "../Layout/Layout";

import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { Notification } from "../components/Notification/Notification";

const axios = require("axios").default;

const Login = () => {
  const ctx = useContext(AuthContext);
  // const navigate = useNavigate();
  // const { state } = useLocation();

  const defaultFormState = {
    email: "",
    password: "",
    loading: false,
  };
  const [form, setForm] = useState(defaultFormState);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const setFormLoading = () => {
    setForm((prevState) => {
      return { ...prevState, loading: !prevState.loading };
    });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormLoading();

    axios
      .post(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
        email: form.email,
        password: form.password,
      })
      .then((response) => {
        ctx.onLogin(form.email, response.data);
        // history.push("/");
        Notification({
          title: "Logged In Successfully",
          color: "green",
          icon: <BsCheckLg />,
        });
        setForm(defaultFormState);
        setFormLoading();
      })
      .catch((e) => {
        if (e.response.status === 401) {
          // console.log(e.response.data);
          Notification({
            title: "Error!",
            message: e.response.data.message,
            color: "red",
            icon: <AiOutlineClose />,
          });
        }
        setFormLoading();
      });
  };

  return (
    <Layout>
      <div className="mx-4 my-6">
        <div className="flex flex-col gap-4 max-w-screen-sm  border  p-4 rounded-md mx-auto">
          <h1 className=" font-bold text-2xl">Login</h1>
          {form.error && (
            <Alert icon={<AlertCircle />} color="red" variant="filled">
              {form.error}
            </Alert>
          )}
          <form className="flex flex-col gap-3 " onSubmit={loginHandler}>
            <TextInput
              placeholder="Your Email"
              label="Email Address"
              type="email"
              name="email"
              value={form.email}
              onChange={inputChangeHandler}
              required
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              name="password"
              value={form.password}
              onChange={inputChangeHandler}
              required
            />
            <Group position="right">
              <Link to="/register">
                <Button variant="subtle">Register</Button>
              </Link>
              <Button
                type="submit"
                {...(form.loading && { loading: form.loading })}
              >
                Login
              </Button>
            </Group>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
