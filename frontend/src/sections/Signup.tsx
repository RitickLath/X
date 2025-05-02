import Landing from "./Landing";
import { useNavigate } from "react-router-dom";
import { formStyles } from "../constants/style";
import { SignUpDataSanitization } from "../utils/zodSchema";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { username, password, email } = Object.fromEntries(
      formData.entries()
    );

    const sanitized = SignUpDataSanitization.safeParse({
      username,
      email,
      password,
    });

    if (!sanitized.success) {
      const messages = sanitized.error.errors.map((e) => e.message);
      setError(messages);
      return;
    }
    setError([]);

    console.log("Signup credentials:", { email, password, username });
    // api integration
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
        <h2 className={formStyles.title}>Create your account</h2>

        {/* Form */}
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

          <div>
            <label className={formStyles.label}>Date of birth</label>
            <p className={formStyles.helperText}>
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
            <div className={formStyles.dateRow}>
              <select name="birthMonth" className={formStyles.select}>
                <option value="">Month</option>
              </select>
              <select name="birthDay" className={formStyles.select}>
                <option value="">Day</option>
              </select>
              <select name="birthYear" className={formStyles.select}>
                <option value="">Year</option>
              </select>
            </div>
          </div>

          {error.length > 0 && (
            <div className="text-red-500 space-y-1">
              {error.length > 0 && (
                <div className="text-red-500 space-y-1">{error[0]}</div>
              )}
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
