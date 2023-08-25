import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { VscError } from "react-icons/vsc";
interface PasswordSavedProps {
  name: string;
  password: string;
  website: string;
  deleteItem(id: string): void;
  loadingDelete: boolean;
}

function PasswordSaved({
  name,
  password,
  website,
  deleteItem,
  loadingDelete,
}: PasswordSavedProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const getLength = () => {
    const { length } = password;
    return "*".repeat(length);
  };

  const deleteFucntion = () => {
    setDeleteConfirm(false);
    setTimeout(() => {}, 2000);
  };
  return (
    <div
      className={`flex flex-col  gap-5 w-full h-max px-5 py-7 border-b-2 border-zinc-400 relative ${
        loadingDelete ? "pointer-events-none opacity" : ""
      }`}
    >
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="absolute w-full h-full top-0 z-50 flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="h-full w-full  p-10 bg-Secondary flex flex-col gap-5 text-xl "
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 10,
                mass: 0.5,
              }}
            >
              <div className="relative w-full ">
                <h1 className="text-2xl font-bold text-red-400 text-center">
                  Are you sure you want to delete this Item{" "}
                </h1>
                <button onClick={() => setDeleteConfirm(false)}>
                  <VscError
                    size={35}
                    fill="red"
                    className="absolute -right-5 -top-1/3 hover:scale-105 hover:rotate-6 hover:shadow-lg transition-all ease-in-out"
                  />
                </button>
              </div>
              <button onClick={deleteFucntion}>
                <IoTrashBin
                  onClick={deleteItem}
                  size={35}
                  className="
                  hover:rotate-3
                  hover:scale-125
                  hover:animate-bounce
                  hover:shadow-2xl transition-all duration-200 ease-in-out fill-red-500 cursor-pointer m-auto -translate-y-1/4
        "
                ></IoTrashBin>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {loadingDelete && (
        <div className="absolute w-full h-full top-0 left-0 z-10 overflow-hidden">
          <div className="h-[150%] skew-x-12 blur-lg w-8 bg-white/40 animateCss"></div>
        </div>
      )}
      <div
        className={`flex w-full justify-between ${
          loadingDelete ? "opacity-20" : ""
        }`}
      >
        <h1
          className={`font-medium text-2xl ${
            collapsed
              ? "underline underline-offset-2 text-lg text-zinc-400"
              : ""
          } transition-all`}
        >
          {name}
        </h1>
        <div className="flex gap-3">
          {collapsed && (
            <button>
              <IoTrashBin
                size={30}
                className={`transition-all duration-200 ease-in-out fill-red-500`}
                onClick={() => setDeleteConfirm(true)}
              />
            </button>
          )}
          <button>
            <IoIosArrowDropupCircle
              size={30}
              className={`rotate-180 ${
                collapsed ? "rotate-0 fill-Primary" : ""
              } transition-all duration-200 ease-in-out `}
              onClick={() => setCollapsed(!collapsed)}
            />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {collapsed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.25,
              type: "spring",
              stiffness: 150,
              damping: 10,
            }}
            className="ml-2 flex flex-col gap-5"
          >
            <div className="text-white font-lg flex items-center gap-4">
              <p className="text-zinc-400">Website:</p>{" "}
              <span className="font-bold text-xl">{website}</span>
            </div>
            <div className="text-white font-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-zinc-400">PassWord:</p>
                <span className="font-bold text-xl">
                  {showPassword ? password : getLength()}
                </span>
              </div>
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <AiFillEyeInvisible size={30} />
                ) : (
                  <AiFillEye size={30} />
                )}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default PasswordSaved;
