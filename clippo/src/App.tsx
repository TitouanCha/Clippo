import { getCurrentWindow } from "@tauri-apps/api/window";
import "./App.css";
import image from "./assets/honk.png";
import { useState } from "react";
import { activityEnum } from "./enum/activity.enum";

function App() {
  const [showPopUp, setShowPopUp] = useState(false);

  const activitySelection = (activity: activityEnum) => {
    console.log(`Activity selected: ${activity}`);
  }

  return (
    <div
      onMouseDown={(e) => {
        e.currentTarget.style.cursor = "grabbing";
        getCurrentWindow().startDragging();
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.cursor = "grab";
        setShowPopUp(true);
      }}
      className="w-[500px] h-[300px] rounded-3xl flex flex-row items-stretch text-white text-2xl backdrop-blur-xl"
    >
      <img
        src={image}
        alt="PNG"
        className="max-w-[50%] max-h-full object-contain self-end rounded-xl pointer-events-none p-10"
      />
      { showPopUp && (
        <div className="flex flex-col items-center gap-4">
          <div className="chat chat-start self-start">
            <div className="chat-bubble text-lg">
              Hello !!
              On fait quoi aujourd'hui ?
            </div>
          </div>
          <div className="flex flex-row gap-2 w-full justify-center">
            <button className="btn btn-outline btn-warning btn-sm"
              onClick={() => activitySelection(activityEnum.QUIZZ)}
            >{activityEnum.QUIZZ}</button>
            <button className="btn btn-outline btn-warning btn-sm"
              onClick={() => activitySelection(activityEnum.GAME)}
            >{activityEnum.GAME}</button>

          </div>
          <div className="flex flex-row gap-2 w-full justify-center">
            <button className="btn btn-outline btn-warning btn-sm"
              onClick={() => activitySelection(activityEnum.QUESTIONS)}
            >{activityEnum.QUESTIONS}</button>
          </div>
        </div>
      )
    } 
    </div>
  );
}

export default App;