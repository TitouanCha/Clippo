import { getCurrentWindow } from "@tauri-apps/api/window";
import "./css/App.css";
import image from "./assets/honk.png";
import { useEffect, useRef, useState } from "react";
import { ScreenEnum } from "./enum/screen.enum";
import { HomePopUp } from "./pop-up/home-popup.tsx";
import { QuizzMenuPopUp } from "./pop-up/quizz-menu-popup.tsx";
import { PanickPopUp } from "./pop-up/panick-popup.tsx";
import { GamePopUp } from "./pop-up/game-popup.tsx";
import { QuestionPopUp } from "./pop-up/question-popup.tsx";
import { QuizzPopUp } from "./pop-up/quizz-popup.tsx";

function App() {
  const [screen, setScreen] = useState<ScreenEnum | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isPanicking, setIsPanicking] = useState(false);

  const handleMouseDown = () => {
    console.log("Mouse Down")
    getCurrentWindow().startDragging();
    setIsDragging(true);
  };

  const handleMouseMove = () => {
    console.log("Mouse Move")
    if (isDragging && screen !== ScreenEnum.QUIZZ) {
      setIsPanicking(true);
    }
  };

  const handleMouseUp = () => {
    console.log("Mouse Up")
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
        if(screen !== ScreenEnum.QUIZZ){
          activitySelection(ScreenEnum.HOME)
        }
      }}
      className="w-fit h-fit rounded-3xl flex flex-row items-stretch text-white text-2xl backdrop-blur-xl select-none"
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
          {screen === ScreenEnum.QUIZZ_MENU && (
            <QuizzMenuPopUp activitySelection={activitySelection}/>
          )}
          {screen === ScreenEnum.QUIZZ && (
            <QuizzPopUp activitySelection={activitySelection}/>
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