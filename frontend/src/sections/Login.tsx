import { FC } from "react";
import CreateAccountForm from "../component/CreateAccountForm";

const Login: FC = () => {
  return (
    <div className="">
      <CreateAccountForm mode="login" />
    </div>
  );
};

export default Login;
