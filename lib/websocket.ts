import WebSocket from "ws";

export function setupWebSocket(server: any): void {
  const wss = new WebSocket.Server({ server });
  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  });
}