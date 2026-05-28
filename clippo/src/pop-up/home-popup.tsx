import { useState } from "react";
import "../css/App.css";

import { ScreenEnum } from "../enum/screen.enum"

type Props = {
    activitySelection: (activity: ScreenEnum) => void;
}

export function HomePopUp({ activitySelection}: Props) {

    return (
      <div className="flex flex-col items-center gap-4">
            <div className="chat chat-start self-start">
              <div className="chat-bubble text-lg outline outline-1 outline-white">
                Hello !!
                On fait quoi aujourd'hui ?
              </div>
            </div>
            <div className="flex flex-row gap-2 w-full justify-center">
              <button className="btn btn-outline btn-warning btn-sm"
                onClick={() => activitySelection(ScreenEnum.QUIZZ)}
              >{ScreenEnum.QUIZZ}</button>
              <button className="btn btn-outline btn-warning btn-sm"
                onClick={() => activitySelection(ScreenEnum.GAME)}
              >{ScreenEnum.GAME}</button>

            </div>
            <div className="flex flex-row gap-2 w-full justify-center">
              <button className="btn btn-outline btn-warning btn-sm"
                onClick={() => activitySelection(ScreenEnum.QUESTIONS)}
              >{ScreenEnum.QUESTIONS}</button>
            </div>
        </div>
    );
}