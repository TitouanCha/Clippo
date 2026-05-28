import { getCurrentWindow } from "@tauri-apps/api/window";
import "./App.css";
import image from "./assets/honk.png";

function App() {
  const handleMouseDown = () => {

  }

  return (
    <div
      onMouseDown={(e) => {
        e.currentTarget.style.cursor = "grabbing";
        getCurrentWindow().startDragging();
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.cursor = "grab";
      }}
      className="w-[500px] h-[300px] rounded-3xl flex flex-row items-stretch text-white text-2xl backdrop-blur-xl"
    >
      <img
        src={image}
        alt="PNG"
        className="max-w-[40%] max-h-full object-contain self-end rounded-xl pointer-events-none"
      />
      <div className="chat chat-start self-start">
        <div className="chat-bubble">
          It's over Anakin, I have the high ground!
        </div>
      </div>
    </div>
  );
}

export default App;