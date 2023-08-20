import "../App.css";
import ButtonComponent from "./ButtonComponent";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FiCircle } from "react-icons/fi";
import CheckBox from "./CheckBox";
import { Slider, ConfigProvider } from "antd";

interface OptionsProps {
  Length: number;
  children: React.ReactNode;
  onCLick: (length: number) => void;
  setLength: (length: number) => void;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeUpperCase: boolean;
  includeLowerCase: boolean;
  updateState?: (stateName: string, value: boolean) => void;
  disabled: boolean;
}

function Options({
  children,
  onCLick,
  Length,
  setLength,
  includeNumbers,
  includeSymbols,
  includeUpperCase,
  includeLowerCase,
  updateState,
  disabled,
}: OptionsProps) {
  const onChange = (newValue: number) => {
    setLength(newValue);
  };
  const handleClick = () => {
    if (onCLick) {
      onCLick(length);
    }
  };

  const handleInput = (stateName: string, value: boolean) => {
    if (updateState) {
      updateState(stateName, value);
    }
  };

  return (
    <>
      <div className="w-full h-full overflow-scroll bg-Bg p-7 flex flex-col gap-3">
        <div className="w-full flex items-center justify-between">
          <h2>Character length</h2>
          <h1 className="text-4xl text-Primary">{Math.floor(Length || 0)}</h1>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Slider: {
                dotSize: 100,
                dotActiveBorderColor: "#a4ffaf",
                dotBorderColor: "#0f0e14",
                controlSize: 10,
                handleActiveColor: "#0f0e14",
                handleColor: "#a4ffaf",
                handleLineWidth: 0,
                handleLineWidthHover: 0,
                handleSize: 20,
                handleSizeHover: 26,
              },
            },
          }}
        >
          <Slider
            defaultValue={8}
            max={20}
            min={8}
            step={0.1}
            tooltip={{ open: false }}
            onChange={onChange}
            keyboard
            trackStyle={{
              backgroundColor: "#a4ffaf",
              height: "7px",
              borderRadius: "5px",
            }}
            railStyle={{
              backgroundColor: "#0f0e14",
              height: "7px",
              borderRadius: "5px",
            }}
          />
        </ConfigProvider>
        <div className="gap-5 flex flex-col h-max py-5">
          <CheckBox
            included={includeUpperCase}
            handleInput={() =>
              handleInput("IncludeUpperCase", !includeUpperCase)
            }
            name="Include"
            span="UPPERCASE"
            id="check-1"
          />
          <CheckBox
            included={includeLowerCase}
            handleInput={() =>
              handleInput("IncludeLowerCase", !includeLowerCase)
            }
            name="Include"
            span="lowercase"
            id="check-2"
          />
          <CheckBox
            included={includeNumbers}
            handleInput={() => handleInput("IncludeNumbers", !includeNumbers)}
            name="Include"
            span="Numb3r5"
            id="check-3"
          />
          <CheckBox
            included={includeSymbols}
            handleInput={() => handleInput("IncludeSymbols", !includeSymbols)}
            name="Include"
            span="Sp€ci@l"
            id="check-4"
          />
        </div>
        {children}
        <ButtonComponent
          disabled={disabled}
          onClick={handleClick}
          ClassName="
          group
          w-full
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
          disabled:pointer-events-none
        "
        >
          Generate
          {disabled ? (
            <FiCircle size={20} className="mt-1 animate-spin" />
          ) : (
            <AiOutlineArrowRight
              size={20}
              className="mt-1 group-hover:fill-white transition-all duration-100 "
            />
          )}
        </ButtonComponent>
      </div>
    </>
  );
}

export default Options;
