import { invoke } from "@tauri-apps/api/core";
import { use, useEffect, useState } from "react";
import { Question, Quizz } from '../models/quizz.model';
import { ResponseButtons } from "../components/response-buttons.component";
import { ScreenEnum } from "../enum/screen.enum";
import { QuizzDifficultyEnum } from "../enum/quizz-difficulty.enum";

type Props = {
    activitySelection: (activity: ScreenEnum) => void,
    difficulty: QuizzDifficultyEnum
}

export function QuizzPopUp({activitySelection, difficulty}: Props) {
    const [quizz, setQuizz] = useState<Quizz | null>(null);
    const [question, setQuestion] = useState<Question>();
    const [questionTab, setQuestionTab] = useState(["", "", "", ""]);
    const [quizzIndex, setQuizzIndex] = useState<number>(0);
    const [goodAnswerIndex, setGoodAnswerIndex] = useState<number>(0)

    const [quizzResult, setQuizzResult] = useState<number>(0);
    const [isQuizzFinish, setIsQuizzFinish] = useState<boolean>(false);

    const questionsLimit = 10
    useEffect(() => {

        async function fetchQuizz() {
            await invoke("get_quizz", {
            difficulty: difficulty,
            limit: questionsLimit.toString()
            })
            .then((data: any) => {
                setQuizz(data)
                setQuestion(data.quizzes[0])
            })
            .catch((error) => console.error("Error fetching quizz:", error));
        }
        fetchQuizz();
    }, [])

    useEffect(() => {
        let newQuestionTab = ["", "", "", ""];

        const randomIndex = Math.floor(Math.random() * 4);
        setGoodAnswerIndex(randomIndex);
        newQuestionTab[randomIndex] = question?.answer ?? "";

        let badAnswerIndex = 0
        for(let i=0; i<4; i++){
            if(newQuestionTab[i] === ""){
                newQuestionTab[i] = question?.badAnswers[badAnswerIndex] ?? "";
                badAnswerIndex ++;
            }
        }

        setQuestionTab(newQuestionTab);

    }, [question])

    function handleRepons(responsIndex: number){
        if(responsIndex === goodAnswerIndex){
            setQuizzResult(quizzResult +1);
        }
        const newQuizzIndex = quizzIndex +1
        setQuizzIndex(newQuizzIndex);
        setQuestion(quizz?.quizzes[newQuizzIndex]);

        if(newQuizzIndex === questionsLimit){
            setIsQuizzFinish(true)
        }
    }

    function endQuizz() {
        activitySelection(ScreenEnum.HOME)
    }

    return (
        <div>
            {!quizz ?(
                <div className="chat chat-start self-start">
                    <div className="chat-bubble text-lg outline outline-1 outline-white">
                        Je reflechie a un quizz...
                    </div>
                </div>
            ):(
                !isQuizzFinish ?(
                    <div className="flex flex-col items-center gap-4">
                        <div className="chat chat-start self-start">
                            <div className="chat-bubble text-sm outline outline-1 outline-white">
                                {question?.question}
                            </div>
                            <div className="chat-footer opacity-50 text-lg">
                                {(quizzIndex + 1).toString()}/{quizz.count}
                            </div>
                        </div>
                        <ResponseButtons questionTab={questionTab} handleRepons={handleRepons}/>
                    </div>
                ):(
                    <div>
                        <div className="chat chat-start self-start">
                            <div className="chat-bubble text-lg outline outline-1 outline-white">
                                Bien jouer tu as {quizzResult} bonne reponse sur {questionsLimit}
                            </div>
                        </div>
                        <button className="btn btn-outline btn-warning btn-sm"
                            onClick={() => endQuizz()}
                        >Finir le quizz</button>
                    </div>
                )
            )}    
        </div>
    );
}