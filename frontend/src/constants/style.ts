export const LandingStyles = {
  wrapper: "z-0 bg-black min-h-screen",
  container:
    "z-0 p-10 md:px-36 lg:pt-24 lg:flex justify-evenly lg:space-x-14 text-white",
  imageWrapper: "lg:mt-0 lg:mr-20 lg:flex items-center",
  image: "w-[50px] h-[60px] lg:w-[300px] lg:h-[300px] object-contain",
  contentWrapper:
    "flex flex-col items-start lg:justify-center text-left space-y-5 max-w-[400px] pt-12 lg:pt-0",
  heading: "tracking-wide text-5xl sm:text-7xl font-bold",
  subHeading: "text-2xl sm:text-3xl font-extrabold pt-2",
  signInText: "pt-2 text-lg font-bold",
  loaderWrapper: "bg-black h-screen w-full flex justify-center items-center",
  variantAButton: "bg-[#D78330] text-white font-semibold mt-4",
  variantBWrapper: "fixed bottom-4 w-full px-6 flex justify-center z-50",
  variantBInner:
    "bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-3 rounded-xl shadow-lg flex items-center space-x-4",
  variantBButton: "bg-white text-blue-600 font-bold px-4 rounded-md",
};

export const postStyles = {
  wrapper:
    "border-r-2 border-gray-700 max-w-[700px] w-full bg-black flex items-start space-x-3 sm:space-x-5 p-4 border-b border-gray-800 text-white",
  avatar: "w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover",
  contentContainer: "flex-1",
  textarea:
    "w-full outline-none bg-transparent resize-none text-lg sm:text-xl placeholder-gray-400 p-2 rounded-md",
  bottomRow: "flex justify-between items-center mt-3",
  postButtonBase:
    "text-black font-semibold px-5 py-1.5 rounded-full transition duration-150",
  postButtonActive: "bg-white hover:bg-gray-200 cursor-pointer",
  postButtonDisabled: "bg-[#787A7A] cursor-not-allowed",
};

export const formStyles = {
  wrapper: "min-h-screen z-50 text-white flex lg:items-center justify-center",
  container:
    "max-w-[100%] z-10 bg-black lg:max-w-[600px] rounded-md p-8 lg:p-14 w-full space-y-10",
  header: "flex justify-between items-center",
  close: "text-2xl font-bold cursor-pointer",
  logo: "w-[40px] h-[40px]",
  spacer: "w-6",
  title: "text-3xl font-bold",
  form: "space-y-4",
  input:
    "w-full bg-transparent border border-[#71767B] rounded px-4 py-4 focus:outline-none focus:border-[#1A8CD8]",
  label: "block text-sm font-semibold mb-1",
  helperText: "text-xs text-gray-400 mb-2",
  select:
    "flex-1 bg-transparent border border-[#71767B] rounded px-2 py-4 text-white",
  dateRow: "flex gap-2",
  submit:
    "w-full cursor-pointer bg-[#787A7A] hover:bg-gray-200 transition font-semibold text-black py-3 rounded-full mt-4",
  toggleText: "mt-8 text-sm",
  toggleLink: "text-[#1A8CD8] cursor-pointer font-semibold",
};
