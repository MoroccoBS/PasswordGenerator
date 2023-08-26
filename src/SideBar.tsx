// import Account from "./Account";
import Saved from "./pages/Saved";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect, useCallback } from "react";
import { VscError } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";
import { supabase } from "./supabaseClient";
import { FiRefreshCw } from "react-icons/fi";
import Account from "./Account";

interface Props {
  session: Session;
  setClose: () => void;
}

function SideBar({ setClose, session }: Props) {
  const [section, setSection] = useState<"Saved" | "Account">("Saved");
  const [userName, setUserName] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any>([]);
  const fetchItems = useCallback(async () => {
    if (session) {
      const { data, error } = await supabase
        .from("passwords")
        .select("*")
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error fetching items:", error);
      } else {
        setItems(data);
      }
    }
  }, [session]);
  useEffect(() => {
    let isClosed = false;
    if (!isClosed) {
      fetchItems();
      const email = session?.user?.email;
      setUserName(email?.split("@")[0] || "");
    }
    return () => {
      isClosed = true;
    };
  }, [session, fetchItems]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setFilteredItems(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return items.filter((item: any) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [items, searchQuery]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteItem = useCallback(async (id: string) => {
    setLoadingDelete(true);
    const { error } = await supabase
      .from("passwords")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (error) {
      console.error("Error deleting item:", error);
    } else {
      console.log("Item deleted");
      fetchItems();
      setTimeout(() => {
        setLoadingDelete(false);
      });
    }
  }, []);

  const handleClose = useCallback(() => {
    setClose();
  }, [setClose]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: "0" }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, type: "tween" }}
      className="lg:w-3/6 w-full h-screen bg-Bar shadow-2xl px-5 overflow-y-scroll z-10 absolute right-0"
    >
      <div className="w-full py-7 flex items-center gap-5 border-b-2 border-Primary/70">
        <img
          className="object-cover w-10 h-auto"
          src="src/assets/images/favicon.svg"
          alt=""
        />
        <div className="w-full">
          <h1 className="text-2xl font-bold text-Primary">Welcome</h1>
          <p className="text-sm">{userName}</p>
        </div>
        <button onClick={handleClose}>
          <VscError
            size={35}
            fill="red"
            className="hover:scale-105 hover:rotate-6 hover:shadow-lg transition-all ease-in-out"
          />
        </button>
      </div>
      <div
        className={`w-full ml-auto mr-auto flex px-5 mt-5 text-xl section-cont ${
          section === "Account"
            ? "after:translate-x-full"
            : "after:translate-x-0"
        }`}
      >
        <div
          className={`w-1/2 text-center text-zinc-400 ${
            section === "Saved" ? "section" : ""
          } cursor-pointer py-5`}
          onClick={() => setSection("Saved")}
        >
          PassWords Saved
        </div>
        <div
          className={`w-1/2 text-center text-zinc-400 ${
            section === "Account" ? "section" : ""
          } cursor-pointer border-zinc-500 border-b-2 py-5`}
          onClick={() => setSection("Account")}
        >
          Account
        </div>
      </div>

      {section === "Saved" ? (
        <>
          <>
            <div className="relative">
              <input
                onInput={handleSearchChange}
                type="text"
                className="w-full p-5 mt-6 bg-Secondary input"
                placeholder="Search"
              />
              <BsSearch
                size={25}
                className="text-zinc-40 absolute right-1 top-[50%] -translate-x-1/2 cursor-pointer "
              />
            </div>
            <button
              className="mt-7 flex gap-3 text-zinc-400 hover:text-white transition-all onClick group hover:scale-105 hover:rotate-3 hover:shadow-2xl"
              onClick={() => {
                fetchItems();
              }}
            >
              <FiRefreshCw
                size={25}
                className="group-hover:animate-spin duration-100 "
              />
              refresh
            </button>
          </>
          <Saved
            filteredItems={filteredItems}
            deleteItem={deleteItem}
            loadingDelete={loadingDelete}
          />
        </>
      ) : section === "Account" ? (
        <Account session={session} />
      ) : null}
      {/* {section === "Account" && <Account />} */}
      {/* <div className="w-full h-full bg-slate-700 p-10">
        <Account session={session} />
        <Saved />
      </div> */}
    </motion.div>
  );
}

export default SideBar;
