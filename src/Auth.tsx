import { useState } from "react";
import { supabase } from "./supabaseClient";
import { AnimatePresence } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import PopUp from "./components/PopUp";
import { FiCircle } from "react-icons/fi";

function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState({ state: false, error: "" });
  const [typeError, setTypeError] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "" || !email.includes("@")) {
      setTypeError(true);
      setTimeout(() => {
        setTypeError(false);
      }, 1500);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setState({ state: true, error: error.message });
    } else {
      setState({
        state: true,
        error: "The Perfect time to check your email inbox!",
      });
    }
    setTimeout(() => {
      setState({
        state: false,
        error: "The Perfect time to check your email inbox!",
      });
      setTimeout(() => {
        setState({ state: false, error: "" });
      }, 1000);
    }, 3000);
    setLoading(false);
  };
  const handleGitHubLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      console.error("GitHub login error:", error);
    }
  };

  return (
    <>
      <AnimatePresence>
        {state.state && (
          <>
            {state?.error === "The Perfect time to check your email inbox!" ? (
              <PopUp errorText={state?.error} />
            ) : (
              <PopUp errorText={state?.error} error="error" />
            )}
          </>
        )}
        {easterEgg && (
          <PopUp
            errorText="What Part of Impossible you didn't get?"
            error="error"
          />
        )}
      </AnimatePresence>
      <div className="shadow-2xl lg:ml-20 ml-0 z-40 flex-col lg:w-1/2 sm:w-4/5 w-11/12 sm:h-max h-5/6 py-10 sm:px-10 px-5 bg-Bg flex gap-5 rounded-xl">
        <h1 className="self-center text-5xl font-semibold mt-3 ml-5">
          SignIn<span className="text-Primary">.</span>
        </h1>
        <div className="mt-4">
          <h2 className="text-center font-bold text-xl">
            {/* You can't remember your password?? */}
            Tyred of forgetting you're password?
            <span className="text-Primary text-2xl"> SingIn without it!</span>
          </h2>
          <p className="mt-10">Enter your email:</p>
          <form className="mt-3 w-full flex flex-col gap-5 justify-center items-center">
            <input
              className={` font-semibold text-lg w-full py-4 px-6 focus:outline-none bg-Bar focus:outline-Primary transition-all ease ${
                typeError ? "outline outline-red-600" : ""
              }`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className={`group
          w-full
          py-4
          flex
          justify-center
          items-center
          gap-3
          text-lg
          bg-Primary
          text-Bar
          border-Primary
          font-semibold
          border-2
          hover:bg-transparent
          hover:border-Primary
          hover:border-2
          hover:text-white
          transition-all
          duration-300
          ease-in-out
          disabled:opacity-50
          disabled:pointer-events-none
          `}
              disabled={loading}
              type="submit"
              onClick={handleLogin}
            >
              {loading ? (
                <>
                  Loading...
                  <FiCircle size={20} className="mt-1 animate-spin" />{" "}
                </>
              ) : (
                <span>Send magic link</span>
              )}
            </button>
            <button
              type="submit"
              onClick={handleGitHubLogin}
              className={`group
          w-full
          py-4
          flex
          justify-center
          items-center
          gap-3
          text-lg
          bg-Primary
          font-semibold
          hover:rotate-1
          hover:scale-[1.01]
          hover:shadow-2xl
         bg-transparent
         border-Primary
         border-2
         text-white
          transition-all
          duration-300
          ease-in-out
          disabled:opacity-50
          disabled:pointer-events-none
          `}
              disabled={loading}
            >
              {loading ? (
                <>
                  Loading...
                  <FiCircle size={20} className="mt-1 animate-spin" />{" "}
                </>
              ) : (
                <>
                  <AiFillGithub size={35} />
                  GitHub
                </>
              )}
            </button>
            <p className="self-center m-auto font-medium text-center">
              Generate without login?{" "}
              <button
                type="button"
                onClick={() => {
                  setEasterEgg(true);
                  setTimeout(() => {
                    setEasterEgg(false);
                  }, 3000);
                }}
                className="hover:text-Primary hover:underline transition-all"
              >
                Thats Impossible!!
              </button>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Auth;
