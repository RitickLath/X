import { FC } from "react";
import { LandingStyles } from "../constants/style";
import Button from "../Generic Components/Button";

const CTAB: FC = () => {
  const handleClick = () => {
    // will add the api to let the analytics of A/B testing work
  };
  return (
    <div className={LandingStyles.variantBWrapper}>
      <div className={LandingStyles.variantBInner}>
        <span className="font-semibold">Try our Tailwind Component Kit →</span>
        <a
          href="https://neonkit.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            content="Check it out"
            onClick={handleClick}
            className={LandingStyles.variantBButton}
          />
        </a>
      </div>
    </div>
  );
};

export default CTAB;
