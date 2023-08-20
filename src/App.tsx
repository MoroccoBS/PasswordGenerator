import "./App.css";
import Display from "./components/Display";
import Options from "./components/Options";
import Strength from "./components/Strength";
import { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [Password, setPassword] = useState("");
  const [length, setLength] = useState(20);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);
  function generateRandomString(length: number) {
    let characters = "";
    if (includeNumbers) {
      characters += "0123456789";
    }
    if (includeSymbols) {
      characters += "!@#$%^&*()";
    }
    if (includeUpperCase) {
      characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (includeLowerCase) {
      characters += "abcdefghijklmnopqrstuvwxyz";
    }
    let result = "";
    let interactions = 0;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    const interval = setInterval(() => {
      const password = result
        .split("")
        .map((_letter, index) => {
          if (index < interactions) {
            return result[index];
          }
          return characters[Math.floor(Math.random() * 26)];
        })
        .join("");
      setPassword(password);
      if (interactions > length) {
        clearInterval(interval);
      }
      if (length >= 14) {
        interactions += 1 / 5;
      } else if (length >= 8) {
        interactions += 1 / 10;
      }
    }, 30);
    interval;
  }

  useEffect(() => {
    const count = [
      includeNumbers,
      includeSymbols,
      includeUpperCase,
      includeLowerCase,
    ].filter((state) => state).length;
    setStrength(count);
    if (length >= 14) {
      setStrength((prev) => prev + 1);
    }
  }, [
    includeNumbers,
    includeSymbols,
    includeUpperCase,
    includeLowerCase,
    length,
  ]);

  const updateState = (stateName: string, value: boolean) => {
    switch (stateName) {
      case "IncludeLowerCase":
        setIncludeLowerCase(value);
        break;
      case "IncludeNumbers":
        setIncludeNumbers(value);
        break;
      case "IncludeUpperCase":
        setIncludeUpperCase(value);
        break;
      case "IncludeSymbols":
        setIncludeSymbols(value);
        break;
      default:
        break;
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(Password)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };
  return (
    <>
      <AnimatePresence>
        {copied && (
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
            className="items-center p-5 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-Bar rounded-xl shadow-2xl flex gap-4"
          >
            <h1 className="text-lg"> Text copied to clipboard</h1>
            <AiOutlineCheck size={25} fill="#a4ffaf" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="lg:w-[35rem] w-4/5 h-full flex flex-col items-center gap-5 m-auto pt-10 pb-7">
        <h1 className="text-2xl pt-2">Password Generator</h1>
        <Display PassWord={Password} onCopy={handleCopyClick} />
        <Options
          onCLick={() => generateRandomString(length)}
          Length={length}
          setLength={setLength}
          updateState={updateState}
          includeNumbers={includeNumbers}
          includeSymbols={includeSymbols}
          includeUpperCase={includeUpperCase}
          includeLowerCase={includeLowerCase}
        >
          <Strength strength={strength} />
        </Options>
      </div>
    </>
  );
}

export default App;
