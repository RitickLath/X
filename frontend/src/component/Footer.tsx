import React from "react";
import { linksFooter } from "../constants/staticData";

const footerStyles = {
  container:
    "w-full py-6 px-3 lg:px-12 bg-black text-gray-400 text-xs flex flex-wrap justify-center items-center gap-x-2 gap-y-3",
  link: "hover:underline whitespace-nowrap",
  separator: "hidden sm:inline",
  copyright: "w-full text-center pt-4",
};

const Footer = () => {
  return (
    <footer className={footerStyles.container}>
      {linksFooter.map((item, index) => (
        <React.Fragment key={index}>
          <a href="#" className={footerStyles.link}>
            {item}
          </a>
          {index !== linksFooter.length - 1 && (
            <span className={footerStyles.separator}>|</span>
          )}
        </React.Fragment>
      ))}
      <div className={footerStyles.copyright}>© 2025 X Corp.</div>
    </footer>
  );
};

export default Footer;
