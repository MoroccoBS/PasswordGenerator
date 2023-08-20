import Button from "./ButtonComponent";
import { LuClipboardCopy } from "react-icons/lu";

interface DisplayProps {
  PassWord?: string;
  onCopy?: () => void;
  disabled?: boolean;
}

function Display({ PassWord, onCopy, disabled }: DisplayProps) {
  return (
    <>
      <div className="w-full px-7 py-5 flex justify-between bg-Bg">
        <h1
          className={`text-2xl ${
            PassWord === "" ? "text-zinc-600" : ""
          } font-semibold`}
        >
          {PassWord === "" ? "P4$5W0rD!" : PassWord}
        </h1>
        <Button
          onClick={onCopy}
          ClassName="hover:scale-125 hover:rotate-6 hover:shadow-2xl transition-all ease-in-out disabled:opacity-50 disabled:pointer-events-none"
          disabled={disabled}
        >
          {" "}
          <LuClipboardCopy size={27} className="stroke-Primary" />{" "}
        </Button>
      </div>
    </>
  );
}

export default Display;
