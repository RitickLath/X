import { formStyles } from "../constants/style";

const CreateAccountForm = () => {
  return (
    <div className={formStyles.wrapper}>
      <div className={formStyles.container}>
        <div className={formStyles.header}>
          {/* Close button */}
          <button className="text-2xl font-bold cursor-pointer">×</button>
          {/* Logo */}
          <img className={formStyles.logo} src="images/image.png" alt="Logo" />
          <div className="w-6" />
        </div>

        {/* Title */}
        <h2 className={formStyles.title}>Create your account</h2>

        {/* Form */}
        <form className="space-y-4">
          {/* Name input */}
          <input
            type="text"
            required
            placeholder="Name"
            className={formStyles.input}
          />

          {/* Email input */}
          <input
            type="email"
            required
            placeholder="Email"
            className={formStyles.input}
          />

          {/* Date of birth section */}
          <div>
            <label className={formStyles.label}>Date of birth</label>
            <p className={formStyles.helperText}>
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
            <div className="flex gap-2">
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

          {/* Submit button */}
          <button type="submit" className={formStyles.submit}>
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountForm;
