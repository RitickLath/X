import Landing from "./Landing";
import { useNavigate } from "react-router-dom";
import { formStyles } from "../constants/style";
import { useState } from "react";
import { signinhandler } from "../utils/signinLogic";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
    // Pass data to signinhandler
    const response = await signinhandler(email, password);
   
    setStatus(response.status);
    setMessage(response.message);
    // add the token in local Storage
    if (response.status) {
      localStorage.setItem("authorization", `Bearer ${response.data.token}`);
      navigate("/home");
    }
  };

  return (
    <div className={formStyles.wrapper}>
      <div className="absolute top-0 z-0 blur-xs pointer-events-none">
        <Landing />
      </div>
      <div className={formStyles.container}>
        {/* Header */}
        <div className={formStyles.header}>
          <button onClick={() => navigate("/")} className={formStyles.close}>
            ×
          </button>
          <img className={formStyles.logo} src="images/image.png" alt="Logo" />
          <div className={formStyles.spacer} />
        </div>

        {/* Title */}
        <h2 className={formStyles.title}>Sign in to your account</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className={formStyles.form}>
          <input
            type="text"
            name="email"
            required
            placeholder="Email or username"
            className={formStyles.input}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className={formStyles.input}
          />

          {/* Display validation errors */}
          {status !== null && (
            <div
              className={
                status
                  ? "text-green-600 text-sm py-2"
                  : "text-red-500 text-sm py-2"
              }
            >
              {message}
            </div>
          )}

          <p className={formStyles.toggleText}>
            Don’t have an account?{" "}
            <span
              className={formStyles.toggleLink}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>

          <button type="submit" className={formStyles.submit}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
