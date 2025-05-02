import { useNavigate } from "react-router-dom";
import { formStyles } from "../constants/style";

interface AuthFormProps {
  mode: "signup" | "login";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const navigate = useNavigate();
  const isSignup = mode === "signup";

  // Dynamic placeholders and text
  const emailPlaceholder = isSignup ? "Email" : "Email or username";
  const submitText = isSignup ? "Sign up" : "Log In";
  const toggleText = isSignup
    ? ["Already have an account?", "Login", "/login"]
    : ["Don't have an account?", "Sign up", "/signup"];

  const handleSubmit = () => {};

  return (
    <div className={formStyles.wrapper}>
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
        <h2 className={formStyles.title}>
          {isSignup ? "Create your account" : "Sign in to your account"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className={formStyles.form}>
          {isSignup && (
            <input
              type="text"
              required
              placeholder="Username"
              className={formStyles.input}
            />
          )}

          <input
            type="text"
            required
            placeholder={emailPlaceholder}
            className={formStyles.input}
          />

          {isSignup ? (
            <>
              <input
                type="password"
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
                  <select className={formStyles.select}>
                    <option>Month</option>
                  </select>
                  <select className={formStyles.select}>
                    <option>Day</option>
                  </select>
                  <select className={formStyles.select}>
                    <option>Year</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <input
              type="password"
              required
              placeholder="Password"
              className={formStyles.input}
            />
          )}

          {/* Toggle between forms */}
          <p className={formStyles.toggleText}>
            {toggleText[0]}{" "}
            <span
              className={formStyles.toggleLink}
              onClick={() => navigate(toggleText[2])}
            >
              {toggleText[1]}
            </span>
          </p>

          {/* Submit button */}
          <button type="submit" className={formStyles.submit}>
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
