interface propType {
  label: string;
  isActive: boolean;
  onClick: () => void;
}
const TabButton = ({ label, isActive, onClick }: propType) => {
  return (
    <div
      onClick={onClick}
      className=" cursor-pointer border-0 hover:bg-[#181818] w-1/3 text-center"
    >
      <button
        className={`${"py-5 px-1 text-lg"} ${
          isActive ? "border-b-2 border-[#1D9BF0]" : ""
        }`}
      >
        {label}
      </button>
    </div>
  );
};

export default TabButton;
