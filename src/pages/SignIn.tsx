import Auth from "../Auth";

function SignIn() {
  return (
    <>
      <div className="gap-20 bg-loading bg-no-repeat bg-center bg-cover w-full h-full absolute flex flex-col lg:flex-row items-center justify-around">
        <Auth />
        <div className="w-full h-full absolute bg-black/20 z-10"></div>
        <img
          src="src/assets/images/Loading.png"
          className="object-contain w-1/2 h-full lg:relative absolute"
          alt=""
        />
      </div>
    </>
  );
}

export default SignIn;