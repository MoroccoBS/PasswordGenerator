/* eslint-disable @typescript-eslint/no-explicit-any */
import App from "./App";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Session } from "@supabase/supabase-js";
import { AnimatePresence } from "framer-motion";
import Loading from "./components/Loading";
import SignIn from "./pages/SignIn";
import { AiOutlineMenu } from "react-icons/ai";
import SideBar from "./SideBar";
import PopUp from "./components/PopUp";
function MainApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState({
    isUpdated: false,
    error: "",
  });

  const createProfileIfNotExists = async (userId: string, userData: any) => {
    // Check if the user ID exists in the profiles table
    const { data: existingProfiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);

    if (error) {
      console.error("Error checking existing profiles:", error);
      return;
    }

    // If no existing profile found, create a new profile
    if (existingProfiles.length === 0) {
      // Insert profile data into the profiles table
      const { error: insertError } = await supabase
        .from("profiles")
        .insert([{ id: userId, ...userData }]);

      if (insertError) {
        console.error("Error creating profile:", insertError);
      } else {
        /// handle profile added
      }
    } else {
      console.log("Profile already exists");
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      const userData = {
        email: session?.user?.email,
        id: session?.user?.id,
        updated_at: session?.user?.updated_at,
      };
      if (session?.user?.id) {
        createProfileIfNotExists(session?.user?.id, userData);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loading />}
        {profileUpdated.isUpdated && (
          <>
            {profileUpdated.error === "Profile Updated" ? (
              <PopUp errorText={profileUpdated.error} />
            ) : (
              <PopUp errorText={profileUpdated.error} error="error" />
            )}
          </>
        )}
      </AnimatePresence>
      {!session ? (
        <SignIn></SignIn>
      ) : (
        <div className={`w-full h-full gap-10 flex`}>
          <App showSidebar={showSidebar} session={session}></App>
          <AnimatePresence>
            {showSidebar && (
              <SideBar
                session={session}
                setClose={() => setShowSidebar(false)}
                setProfileUpdated={setProfileUpdated}
              ></SideBar>
            )}
          </AnimatePresence>
          <button
            className="absolute sm:top-10 sm:right-10 top-5 right-5 z-0 hover:scale-125 hover:rotate-6 hover:shadow-lg transition-all ease-in-out"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <AiOutlineMenu size={35} />
          </button>
        </div>
      )}
    </>
  );
}

export default MainApp;
