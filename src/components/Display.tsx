import Button from "./ButtonComponent";
import { LuClipboardCopy } from "react-icons/lu";

interface DisplayProps {
  PassWord?: string;
  onCopy?: () => void;
}

function Display({ PassWord, onCopy }: DisplayProps) {
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
        <Button onClick={onCopy} ClassName="">
          {" "}
          <LuClipboardCopy size={27} className=" stroke-Primary" />{" "}
        </Button>
      </div>
    </>
  );
}

export default Display;
