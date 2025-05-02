import { useEffect, useState, FC } from "react";
import { DotLoader } from "react-spinners";
import { LandingStyles } from "../constants/style";
import Button from "../Generic Components/Button";
import { CTAA, CTAB, Footer } from "../component/component";
import { useNavigate } from "react-router-dom";

const Landing: FC = () => {
  const [testing, setTesting] = useState<"A" | "B" | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedVariant = localStorage.getItem("variant") as "A" | "B" | null;

    if (storedVariant) {
      setTesting(storedVariant);
      setLoading(false);
    } else {
      const assigned = Math.random() < 0.5 ? "A" : "B";
      localStorage.setItem("variant", assigned);
      setTesting(assigned);
      setLoading(false);
      console.log(`Assigned by client: ${assigned}`);
    }
  }, []);

  if (loading) {
    return (
      <div className={LandingStyles.loaderWrapper}>
        <DotLoader color="white" />
      </div>
    );
  }

  return (
    <div className={LandingStyles.wrapper}>
      <div className={LandingStyles.container}>
        {/* Image Section */}
        <div className={LandingStyles.imageWrapper}>
          <img
            className={LandingStyles.image}
            src="images/image.png"
            alt="Logo"
          />
        </div>

        {/* Content Section */}
        <div className={LandingStyles.contentWrapper}>
          <h1 className={LandingStyles.heading}>Happening now</h1>
          <h2 className={LandingStyles.subHeading}>Join today.</h2>

          <Button
            onClick={() => {
              navigate("/signup");
            }}
            content="Create account"
            className="bg-[#1A8CD8]"
          />
          <h3 className={LandingStyles.signInText}>Already have an account?</h3>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            content="Sign in"
            className="text-[#1A8CD8] border-2"
          />

          {/* Variant A CTA */}
          {testing === "A" && <CTAA />}
        </div>
      </div>

      {/* Variant B CTA */}
      {testing === "B" && <CTAB />}

      <Footer />
    </div>
  );
};

export default Landing;
