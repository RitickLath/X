import Landing from "./Landing";
import { useNavigate } from "react-router-dom";
import { formStyles } from "../constants/style";
import { useState } from "react";
import { signuphandler } from "../utils/signupLogic";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const { username, password, email } = Object.fromEntries(
      formData.entries()
    ) as {
      username: string;
      email: string;
      password: string;
    };

    const response = await signuphandler(username, email, password);

    setMessage(response.message);
    setStatus(response.status);

    // If status is true navigate for user to login
    if (response.status) {
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className={formStyles.wrapper}>
      <div className="absolute top-0 z-0 blur-xs pointer-events-none">
        <Landing />
      </div>
      <div className={formStyles.container}>
        <div className={formStyles.header}>
          <button onClick={() => navigate("/")} className={formStyles.close}>
            ×
          </button>
          <img className={formStyles.logo} src="images/image.png" alt="Logo" />
          <div className={formStyles.spacer} />
        </div>

        <h2 className={formStyles.title}>Create your account</h2>

        <form onSubmit={handleSubmit} className={formStyles.form}>
          <input
            type="text"
            name="username"
            required
            placeholder="Username"
            className={formStyles.input}
          />
          <input
            type="text"
            name="email"
            required
            placeholder="Email"
            className={formStyles.input}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className={formStyles.input}
          />

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
            Already have an account?{" "}
            <span
              className={formStyles.toggleLink}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

          <button type="submit" className={formStyles.submit}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
