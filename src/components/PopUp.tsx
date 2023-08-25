import { motion } from "framer-motion";
import { AiOutlineCheck } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
interface Props {
  errorType: { error: boolean; text: string };
  error?: string;
}

function PopUp({ errorType, error }: Props) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10, x: "-50%" }}
        animate={{ opacity: 1, y: 50, x: "-50%" }}
        exit={{ opacity: 0, y: -10, x: "-50%" }}
        transition={{
          duration: 0.2,
          type: "spring",
          stiffness: 200,
          damping: 10,
          mass: 0.5,
        }}
        className="text-center z-50 items-center p-5 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-Bar rounded-xl shadow-2xl flex gap-4"
      >
        <h1 className="text-lg">{errorType.text}</h1>
        {error === "error" ? (
          <VscError size={25} fill="red" />
        ) : (
          <AiOutlineCheck size={25} fill="#a4ffaf" />
        )}
      </motion.div>
    </>
  );
}

export default PopUp;
