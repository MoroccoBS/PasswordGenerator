import { VscError } from "react-icons/vsc";
import { FiCircle } from "react-icons/fi";
import { BsFillSaveFill } from "react-icons/bs";
import ButtonComponent from "./ButtonComponent";
import { AnimatePresence, motion } from "framer-motion";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";
import { useEffect, useState, useRef } from "react";
import PopUp from "./PopUp";
import { encryptPassword } from "../Decryption";

interface SaveModalProps {
  Password: string;
  close: () => void;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

function SaveModal({
  Password,
  close,
  session,
  setCloseModal,
  setSuccess,
}: SaveModalProps) {
  const [error, setError] = useState(false);
  const [popupError, setPopupError] = useState(false);
  const [data, setData] = useState({
    website: "",
    password: "",
    name: "",
  });
  const [insertCooldown, setInsertCooldown] = useState(false);

  const ref = useRef<HTMLInputElement>(null);
  const insertData = async () => {
    setInsertCooldown(true);
    if (Password === "") {
      return;
    }

    if (!session?.user) {
      console.error("User not authenticated");
      return;
    }

    const userId = session.user.id;

    if (!userId) {
      console.error("Invalid user ID");
      return;
    }

    if (data.name === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
      return;
    }

    const { data: existingData, error: existingDataError } = await supabase
      .from("passwords")
      .select("*")
      .eq("user_id", userId)
      .eq("name", data.name);

    console.log(existingDataError);

    if (existingData && existingData.length > 0) {
      setPopupError(true);
      setInsertCooldown(false);
      setTimeout(() => {
        setPopupError(false);
      }, 2500);
      return;
    }

    console.log("No existing data found: ", existingDataError);

    const { error } = await supabase
      .from("passwords")
      .insert({
        password: data.password,
        website: data.website,
        name: data.name,
        user_id: userId,
      })
      .single();

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2500);

      // Set a cooldown period after successful insertion
      setCloseModal(false);
      setTimeout(() => {
        setInsertCooldown(false);
      }, 5000);
    }
  };

  useEffect(() => {
    setData({
      ...data,
      password: encryptPassword(Password),
    });
  }, []);
  return (
    <motion.div
      className="absolute w-full h-full z-50 bg-black/50 flex flex-col justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>
        {popupError && (
          <PopUp
            errorText="This Name is already exist, please choose another one"
            error="error"
          />
        )}
      </AnimatePresence>
      <motion.div
        className="sm:w-max h-max w-full  p-10 bg-Bar flex flex-col gap-5 text-xl"
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
          <h1 className="text-4xl font-bold text-Primary text-center">
            Save Your Password
          </h1>
          <button onClick={close}>
            <VscError
              size={35}
              fill="red"
              className="absolute -right-7 -top-1/2 hover:scale-105 hover:rotate-6 hover:shadow-lg transition-all ease-in-out"
            />
          </button>
        </div>
        <input
          ref={ref}
          onChange={(e) =>
            setData({ ...data, name: e.target.value.toLowerCase() })
          }
          type="text"
          className={`w-full p-5 mt-6 bg-Secondary input ${
            error ? "outline-2 outline-red-500 outline animation" : ""
          } transition-all ease-in-out`}
          placeholder="Name(required)"
        />
        <input
          onChange={(e) => setData({ ...data, website: e.target.value })}
          type="text"
          className="w-full p-5 mt-6 bg-Secondary input"
          placeholder="Website"
        />
        <h1 className="p-5">
          You're Password is:{" "}
          <span className="text-Primary text-2xl font-semibold">
            {Password}
          </span>
        </h1>
        <ButtonComponent
          disabled={insertCooldown}
          onClick={insertData}
          ClassName="
		  w-max
          group
          px-20
		  m-auto
          py-4
          flex
          justify-center
          items-center
          gap-3
          text-2xl
          bg-Primary
          font-semibold
          bg-transparent
          border-Primary
          border-2
          text-white
          transition-all
          duration-300
          ease-in-out
          disabled:opacity-50
          disabled:pointer-events-none
          hover:rotate-3
          hover:scale-105
          hover:shadow-2xl
        "
        >
          Save
          {insertCooldown ? (
            <FiCircle size={20} className="mt-1 animate-spin" />
          ) : (
            <BsFillSaveFill
              size={20}
              className="mt-1 group-hover:fill-white transition-all duration-100 "
            />
          )}
        </ButtonComponent>
      </motion.div>
    </motion.div>
  );
}

export default SaveModal;
