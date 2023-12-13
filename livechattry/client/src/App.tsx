import { useState } from "react";
import { Login } from "./components/Login";
import Home from "./Home";

function App() {
  const [roomId, setRoomId] = useState<number>();
  return roomId ? <Home roomId={roomId} /> : <Login onSubmit={setRoomId} />;
}

export default App;
