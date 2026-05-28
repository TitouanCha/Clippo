import { getCurrentWindow } from "@tauri-apps/api/window";
import "./css/App.css";
import image from "./assets/honk.png";
import { useState } from "react";
import { ScreenEnum } from "./enum/screen.enum";
import { HomePopUp } from "./pop-up/home-popup.tsx";
import { QuizzPopUp } from "./pop-up/quizz-popup.tsx";
import { PanickPopUp } from "./pop-up/panick-popup.tsx";
import { GamePopUp } from "./pop-up/game-popup.tsx";
import { QuestionPopUp } from "./pop-up/question-popup.tsx";

function App() {
  const [screen, setScreen] = useState<ScreenEnum | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isPanicking, setIsPanicking] = useState(false);
  
  const handleMouseDown = () => {
    getCurrentWindow().startDragging();
    setIsDragging(true);
  };

  const handleMouseMove = () => {
    if (isDragging) {
      setIsPanicking(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPanicking(false);
  };
  
  const activitySelection = (activity: ScreenEnum) => {
    setScreen(activity);
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDoubleClick={() => {
        activitySelection(ScreenEnum.HOME)
      }}
      className="w-[500px] h-[300px] rounded-3xl flex flex-row items-stretch text-white text-2xl backdrop-blur-xl"
    >
      <img
        src={image}
        alt="PNG"
        className="max-w-[50%] max-h-full object-contain self-end rounded-xl pointer-events-none p-10"
      />
      {isPanicking ? (
        <PanickPopUp/>
      ) : (
        <>
          {screen === ScreenEnum.HOME && (
            <HomePopUp activitySelection={activitySelection}/>
          )}
          {screen === ScreenEnum.QUIZZ && (
            <QuizzPopUp/>
          )}
          {screen === ScreenEnum.GAME && (
            <GamePopUp/>
          )}
          {screen === ScreenEnum.QUESTIONS && (
            <QuestionPopUp/>
          )}
        </>
      )}
    </div>
  );
}

export default App;