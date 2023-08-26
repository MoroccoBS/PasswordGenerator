import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

function Loading() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const loadingMessages = [
    "Wait a while! Rome wasn't built in a day.",
    "Time to take a breathe and smile, how a beautiful you are",
    "Just a moment, while we put on some clothes.",
    "Hold on tight! We're fetching the magic.",
    "Just a sec, we're untangling the internet cables.",
    "Loading... Please wait patiently, we're training a hamster to power our servers.",
    "Hang in there! We're searching for the meaning of life.",
    "Almost there! Our team of highly trained squirrels is working on it.",
    "Just a moment, we're brewing a fresh cup of coffee for our servers.",
    "Loading... We're sending a carrier pigeon to fetch your data.",
    "Hold your horses! We're polishing the pixels for a better experience.",
    "Patience, young grasshopper. We're aligning the stars for you.",
    "Loading... Our web developers are battling the final boss of bugs.",
  ];
  useEffect(() => {
    const animation = animate(count, 100, { duration: 4 });

    return animation.stop;
  }, []);

  return (
    <>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="z-[99999] bg-Secondary bg-no-repeat bg-center bg-cover w-full h-full absolute flex items-center flex-col gap-10 justify-center px-2 md:px-[5rem]"
      >
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{ y: -40 }}
          transition={{ duration: 0.5 }}
          className="md:text-5xl text-3xl font-bold text-center break-words w-5/6 leading-tight"
        >
          {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
        </motion.h1>
        <div className="flex items-center md:text-6xl text-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{ y: 40 }}
            transition={{ duration: 0.5 }}
            className=" font-bold text-Primary"
          >
            {rounded}
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{ y: 40 }}
            transition={{ duration: 0.5 }}
            className=" font-bold text-Primary"
          >
            %
          </motion.span>
        </div>
      </motion.div>
    </>
  );
}

export default Loading;
