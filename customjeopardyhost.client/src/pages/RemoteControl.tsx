import { useEffect, useState } from "react";
import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
} from "@microsoft/signalr";
import type { GameState } from "../types/GameState";

function RemoteControl() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Disconnected");

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("/gamehub")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          setConnectionStatus("Connected");

          connection.on("ReceiveGameState", (newGameState: GameState) => {
            setGameState(newGameState);
          });
        })
        .catch((err) => {
          console.error("SignalR Connection Error: ", err);
          setConnectionStatus("Error");
        });

      connection.onreconnecting(() => {
        setConnectionStatus("Reconnecting...");
      });

      connection.onreconnected(() => {
        setConnectionStatus("Connected");
      });

      connection.onclose(() => {
        setConnectionStatus("Disconnected");
      });
    }
  }, [connection]);

  return (
    <div>
      <h1>Remote Control</h1>
      <p>
        SignalR Status: <strong>{connectionStatus}</strong>
      </p>
      <pre>{JSON.stringify(gameState, null, 2)}</pre>
    </div>
  );
}

export default RemoteControl;
