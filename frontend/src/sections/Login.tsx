import Landing from "./Landing";
import { useNavigate } from "react-router-dom";
import { formStyles } from "../constants/style";
import { useState } from "react";
import { SignInDataSanitization } from "../utils/zodSchema";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    const sanitized = SignInDataSanitization.safeParse({ email, password });

    if (!sanitized.success) {
      const messages = sanitized.error.errors.map((e) => e.message);
      setError(messages);
      return;
    }

    setError([]);

    console.log("Login credentials:", { email, password });
    // api integrayion
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
          {error.length > 0 && (
            <div className="text-red-500 space-y-1">{error[0]}</div>
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
