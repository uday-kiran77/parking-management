import { AlertCircle } from "tabler-icons-react";
import { Link } from "react-router-dom";
import { TextInput, PasswordInput, Alert, Button, Group } from "@mantine/core";

export const RegisterForm = ({ form, setForm, registerHandler }) => {
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  return (
    <div className="mx-4 mt-10">
      <div className="flex flex-col gap-3 max-w-screen-sm  border border-gray-200 p-4 rounded-md mx-auto">
        <h1 className=" font-bold text-2xl">Register</h1>
        <form className="flex flex-col gap-3 " onSubmit={registerHandler}>
          <TextInput
            placeholder="Your Email"
            label="Email Address"
            type="email"
            name="email"
            value={form.email}
            onChange={inputChangeHandler}
            required
          />
          <Group grow>
            <TextInput
              placeholder="John"
              label="First Name"
              type="text"
              name="fName"
              value={form.fName}
              onChange={inputChangeHandler}
              required
            />
            <TextInput
              placeholder="Doe"
              label="Last Name"
              type="text"
              name="lName"
              value={form.lName}
              onChange={inputChangeHandler}
              required
            />
          </Group>
          <TextInput
            placeholder="Your Phone"
            label="Mobile Number"
            type="number"
            name="phone"
            value={form.phone}
            onChange={inputChangeHandler}
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
            <Link to="/login">
              <Button variant="subtle">Login</Button>
            </Link>
            <Button
              type="submit"
              {...(form.loading && { loading: form.loading })}
            >
              Register
            </Button>
          </Group>
        </form>
      </div>
    </div>
  );
};
