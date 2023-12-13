import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

export default function Home({ roomId }) {
  const [sendingmessage, setSendingMessage] = useState("");
  const [showMessages, setShowMessges] = useState([]);
  const WS_URL = `ws://localhost:8000`;

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    queryParams: { roomId },
  });

  const handleSubmit = (e: any) => {
    sendJsonMessage({ message: sendingmessage });
    setSendingMessage("");
  };
  useEffect(() => {
    if (lastJsonMessage) {
      setShowMessges((prevMessages: any[]) => [
        ...prevMessages,
        lastJsonMessage.message,
      ]);
    }
  }, [lastJsonMessage]);

  return (
    <div>
      <h3>Send Message</h3>
      <input
        value={sendingmessage}
        placeholder="Hello...."
        onChange={(e) => setSendingMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Send</button>
      <div className="flex mt-10 flex-col">
        {showMessages.map((message) => (
          <div>{message}</div>
        ))}
      </div>
    </div>
  );
}
