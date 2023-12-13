import React from "react";

export function Login({ onSubmit }) {
  const [roomId, setRoomId] = React.useState<number>(0);

  return (
    <>
      <h1>Welcome</h1>
      <p>Enter your RoomId :</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(roomId);
        }}
      >
        <input
          type="number"
          value={roomId}
          placeholder="123..."
          onChange={(e) => setRoomId(Number(e.target.value))}
        />
        <input type="submit" />
      </form>
    </>
  );
}
