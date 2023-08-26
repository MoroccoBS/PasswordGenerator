interface StrengthProps {
  strength: number;
}

function Strength({ strength }: StrengthProps) {
  const checkStrength = () => {
    if (strength === 5) {
      return [`bg-green-400`, "Very Strong"];
    }
    if (strength === 4) {
      return [`bg-green-400`, "Strong"];
    }
    if (strength === 3) {
      return [`bg-orange-400`, "Medium"];
    }
    if (strength === 2) {
      return [`bg-yellow-400`, "Weak"];
    }
    if (strength === 1) {
      return [`bg-red-400`, "Very Weak"];
    }
    if (strength <= 0) {
      return [`bg-red-400`, "Unusable"];
    }
  };
  const style = checkStrength() || [];
  return (
    <>
      <div className="w-full h-16 p-5 bg-Bar flex justify-between items-center md:text-xl text-base">
        <h1>Strength</h1>
        <div className="flex h-full gap-[6px] items-center">
          <h1 className="mr-1">{style[1]}</h1>
          {strength === 1 ? (
            <>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
              <div className="w-2 h-[100%] border-[1px]"></div>
              <div className="w-2 h-[100%] border-[1px]"></div>
              <div className="w-2 h-[100%] border-[1px]"></div>
              <div className="w-2 h-[100%] border-[1px]"></div>
            </>
          ) : strength === 2 ? (
            <>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
              <div className="w-2 h-[100%] border-[1px]"></div>
              <div className="w-2 h-[100%] border-[1px]"></div>
              <div className="w-2 h-[100%] border-[1px]"></div>
            </>
          ) : strength === 3 ? (
            <>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
              <div className="w-2 h-[100%] border-[1px]"></div>
              <div className="w-2 h-[100%] border-[1px]"></div>
            </>
          ) : strength === 4 ? (
            <>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
              <div className="w-2 h-[100%] border-[1px]"></div>
            </>
          ) : strength >= 5 ? (
            <>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
              <div className={`w-2 h-[100%] border-[1px] ${style[0]}`}></div>
            </>
          ) : strength <= 0 ? (
            <>
              <div className={`w-2 h-[100%] border-[1px]`}></div>
              <div className="w-2 h-[100%] border-[1px]"></div>
              <div className="w-2 h-[100%] border-[1px]"></div>
              <div className="w-2 h-[100%] border-[1px]"></div>
              <div className="w-2 h-[100%] border-[1px]"></div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Strength;
