import "./App.css";
import Display from "./components/Display";
import Options from "./components/Options";
import Strength from "./components/Strength";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Session } from "@supabase/supabase-js";
import SaveModal from "./components/SaveModal";
import { useMediaQuery } from "@mantine/hooks";
import PopUp from "./components/PopUp";
interface AppProps {
  session: Session;
  showSidebar: boolean;
}

function App({ session, showSidebar }: AppProps) {
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [Password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [success, setSuccess] = useState(false);

  function generateRandomString(length: number) {
    if (
      !(
        includeNumbers ||
        includeSymbols ||
        includeUpperCase ||
        includeLowerCase
      )
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1500);
      return;
    }
    setDisabled(true);
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
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("");
      setPassword(password);
      if (interactions > length) {
        clearInterval(interval);
        setDisabled(false);
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
    if (Password === "") {
      return;
    }
    navigator.clipboard
      .writeText(Password)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [copied]);
  return (
    <>
      <AnimatePresence>
        {modal && (
          <SaveModal
            session={session}
            Password={Password}
            close={() => setModal(false)}
            setCloseModal={setModal}
            setSuccess={setSuccess}
          />
        )}

        {copied && <PopUp errorText="Text copied to clipboard" />}

        {error && (
          <PopUp
            errorText="Select at least one type of characters"
            error="error"
          />
        )}
        {success && <PopUp errorText="Password saved" />}
      </AnimatePresence>
      <motion.div
        animate={{
          width: showSidebar && !isMobile ? "50%" : "100%",
        }}
        transition={{
          duration: 0.35,
          type: "spring",
          stiffness: 200,
          damping: 10,
          mass: 0.5,
        }}
        className="w-full h-full"
      >
        <div
          className={`lg:w-[35rem] w-11/12 h-full flex flex-col items-center gap-5 m-auto pt-10 pb-7 ${
            showSidebar && !isMobile ? "w-full" : ""
          }`}
        >
          <h1 className="text-2xl pt-2">Password Generator</h1>
          <Display
            PassWord={Password}
            onCopy={handleCopyClick}
            disabled={copied || disabled}
          />
          <Options
            onCLick={() => generateRandomString(length)}
            insertData={() => {
              Password === "" ? setModal(false) : setModal(true);
              setCopied(false);
            }}
            Length={length}
            setLength={setLength}
            updateState={updateState}
            includeNumbers={includeNumbers}
            includeSymbols={includeSymbols}
            includeUpperCase={includeUpperCase}
            includeLowerCase={includeLowerCase}
            disabled={disabled}
          >
            <Strength strength={strength} />
          </Options>
        </div>
      </motion.div>
    </>
  );
}

export default App;
