import { useEffect, useState, useRef, FC } from "react";
import { DotLoader } from "react-spinners";
import { LandingStyles } from "../constants/style";
import Button from "../Generic Components/Button";
import { CTAA, CTAB, Footer } from "../component/component";

const Landing: FC = () => {
  const [testing, setTesting] = useState<"A" | "B" | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const hasResolved = useRef(false); // ref to track API resolution

  // Will Add local-Storage logic to not let user know about testing. for lets say 5 day interval
  // Once the user recieves the A or B they will be shown the same button for atleast 5 days.
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!hasResolved.current) {
        const fallbackVariant = Math.random() * 10 < 5 ? "A" : "B";
        setTesting(fallbackVariant);
        hasResolved.current = true;
        setLoading(false);
        console.log(`Hit From Timeout: ${fallbackVariant}`);
      }
    }, 2000);

    const fetchTestingVariant = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/variant");
        const result = await response.json();
        // We are not accepting response after 2 second (To not ruin user Experience)
        if (!hasResolved.current) {
          clearTimeout(timeout);
          setTesting(result.variant);
          hasResolved.current = true;
          setLoading(false);
          console.log(`Hit From API: ${result.variant}`);
        }
      } catch (error) {
        console.error("A/B testing fetch failed:", error);
        if (!hasResolved.current) {
          const fallbackVariant = Math.random() * 10 < 5 ? "A" : "B";
          setTesting(fallbackVariant);
          hasResolved.current = true;
          setLoading(false);
          console.log(`Hit From API catch: ${fallbackVariant}`);
        }
      }
    };

    fetchTestingVariant();

    return () => clearTimeout(timeout);
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

          <Button content="Create account" className="bg-[#1A8CD8]" />
          <h3 className={LandingStyles.signInText}>Already have an account?</h3>
          <Button content="Sign in" className="text-[#1A8CD8] border-2" />

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
