import { FC } from "react";
import { LandingStyles } from "../constants/style";
import Button from "../Generic Components/Button";

const CTAA: FC = () => {
  const handleClick = () => {
    // will add the api to let the analytics of A/B testing work
  };
  return (
    <a
      href="https://neonkit.netlify.app/"
      target="_blank"
      rel="noopener noreferrer" // 
    >
      <Button
        content="Explore Tailwind UI Kit"
        onClick={handleClick}
        className={LandingStyles.variantAButton}
      />
    </a>
  );
};

export default CTAA;

// learning: https://stackoverflow.com/questions/57628890/why-people-use-rel-noopener-noreferrer-instead-of-just-rel-noreferrer
