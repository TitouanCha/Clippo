import "../css/App.css";

export function QuizzPopUp() {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="chat chat-start self-start">
              <div className="chat-bubble text-lg outline outline-1 outline-white">
                C'est partie pour un petit quizz !!!
              </div>
            </div>
            <div>
              <button className="btn btn-outline btn-warning btn-sm">C'est partie !!</button>
            </div>
        </div>
    );
}