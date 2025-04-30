import { FC } from "react";
import { LandingStyles } from "../constants/style";
import Button from "../Generic Components/Button";

const CTAA: FC = () => {
  return (
    <Button
      content="Explore Tailwind UI Kit"
      className={LandingStyles.variantAButton}
    />
  );
};

export default CTAA;
