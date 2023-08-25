import Input from "./components/Input";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";
import { useState, useEffect, useCallback, useMemo } from "react";
import ButtonComponent from "./components/ButtonComponent";
import { FiCircle } from "react-icons/fi";
type Props = {
  session: Session;
};

const Account = ({ session }: Props) => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    fullname: "",
  });
  const [sadFace, setSadFace] = useState(false);
  const [moreSadeFace, setMoreSadFace] = useState(false);

  const getProfile = useCallback(async () => {
    setLoading(true);
    const { user } = session;

    const { data, error } = await supabase
      .from("profiles")
      .select(`*`)
      .eq("id", user.id)
      .single();

    if (error) {
      console.warn(error);
    } else if (data) {
      setProfileData({
        username: data.username,
        email: data.email,
        fullname: data.fullname,
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [session]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  async function updateProfile() {
    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username: profileData.username,
      email: profileData.email,
      fullname: profileData.fullname,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      alert("Profile updated");
    }
    setLoading(false);
  }

  const memorizedProfileData = useMemo(() => profileData, [profileData]);
  return (
    <>
      <form
        className="w-full h-max p-10 flex flex-col gap-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          id="email"
          label="Email:"
          value={session.user.email}
          disabled={true}
          type="email"
        />
        <Input
          id="username"
          label="UserName:"
          value={memorizedProfileData.username || ""}
          onChange={(e) =>
            setProfileData({ ...profileData, username: e.target.value })
          }
          required={true}
          type="text"
        />
        <Input
          id="fullname"
          label="FullName:"
          value={memorizedProfileData.fullname || ""}
          onChange={(e) =>
            setProfileData({ ...profileData, fullname: e.target.value })
          }
          required={true}
          type="text"
        />

        <div>
          <ButtonComponent
            ClassName="group
            m-auto
            px-20
            py-4
            flex
            justify-center
            items-center
            gap-3
            text-2xl
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
            disabled:pointer-events-none"
            disabled={loading}
            onClick={updateProfile}
          >
            {loading ? (
              <>
                Update <FiCircle size={20} className="mt-1 animate-spin" />
              </>
            ) : (
              "Update"
            )}
          </ButtonComponent>
        </div>

        <div>
          <ButtonComponent
            ClassName="group
            m-auto
            px-20
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
            hover:shadow-2xl"
            type="button"
            onClick={() => supabase.auth.signOut()}
            onMouseEnter={() => setSadFace(true)}
            onMouseLeave={() => setSadFace(false)}
            onMouseDown={() => setMoreSadFace(false)}
          >
            {sadFace ? (
              <>Sign Out 😐</>
            ) : loading ? (
              <>
                Sign Out <FiCircle size={20} className="mt-1 animate-spin" />
              </>
            ) : moreSadeFace ? (
              <>Sign Out 🤨</>
            ) : (
              <>Sign Out 🤓☝️</>
            )}
          </ButtonComponent>
        </div>
      </form>
    </>
  );
};

export default Account;
