import { FC } from "react";
import { LandingStyles } from "../constants/style";
import Button from "../Generic Components/Button";

const CTAB: FC = () => {
  return (
    <div className={LandingStyles.variantBWrapper}>
      <div className={LandingStyles.variantBInner}>
        <span className="font-semibold">Try our Tailwind Component Kit →</span>
        <Button
          content="Check it out"
          className={LandingStyles.variantBButton}
        />
      </div>
    </div>
  );
};

export default CTAB;
