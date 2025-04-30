import { MdOutlineCreate } from "react-icons/md";
import Button from "../Generic Components/Button";
import { sidebarItems } from "../constants/staticData";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

const styles = {
  container:
    "flex bg-black border-r-[1px] border-[#71767B] text-white min-h-screen flex-col space-y-4 p-4 lg:p-10 w-[80px] lg:w-[310px]",
  logo: "w-[30px] h-[40px] object-contain",
  menuItem: "flex space-x-3 cursor-pointer hover:bg-[#181818] p-2 rounded-lg",
  icon: "text-2xl sm:text-3xl",
  label: "text-lg hidden lg:flex",
  desktopButton: "hidden lg:flex",
  mobileCreateWrapper:
    "lg:hidden w-[50px] h-[50px] -ml-1 cursor-pointer hover:bg-[#D7DBDC] bg-white flex items-center justify-center rounded-full",
  mobileCreateIcon: "text-2xl sm:text-3xl text-black",
};

const Sidebar: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {/* Logo */}
      <img className={styles.logo} src="images/image.png" alt="Logo" />

      {/* Sidebar navigation items */}
      {sidebarItems.map((item, index) => (
        <div
          key={index}
          className={styles.menuItem}
          onClick={() => navigate(item.label)}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}

      {/* Desktop "Post" button */}
      <div className={styles.desktopButton}>
        <Button
          content="Post"
          className="bg-white hover:bg-[#D7DBDC] text-lg text-black"
          size="md"
        />
      </div>

      {/* Mobile Create button */}
      <div className={styles.mobileCreateWrapper}>
        <MdOutlineCreate className={styles.mobileCreateIcon} />
      </div>
    </div>
  );
};

export default Sidebar;
