// A/B Testing in Landing page

import Footer from "../component/Footer";
import Button from "../Generic Components/Button";

const LandingStyles = {
  wrapper: "bg-black min-h-screen",
  container:
    "p-10 md:px-36 lg:pt-24 lg:flex justify-evenly lg:space-x-14 text-white",
  imageWrapper: "lg:mt-0 lg:mr-20 lg:flex items-center",
  image: "w-[50px] h-[60px] lg:w-[300px] lg:h-[300px] object-contain",
  contentWrapper:
    "flex flex-col items-start lg:justify-center text-left space-y-6 max-w-[400px] pt-12 lg:pt-0",
  heading: "tracking-wide text-5xl sm:text-7xl font-bold",
  subHeading: "text-2xl sm:text-3xl font-extrabold pt-2",
  signInText: "pt-8 text-lg font-bold",
};

const Landing = () => {
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
