import { WebSocketServer } from "ws";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  if (req.headers.upgrade !== "websocket") {
    res.status(400).json({ error: "Expected WebSocket" });
    return;
  }
  const wss = new WebSocketServer({ noServer: true });
  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  });
  res.socket.server.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  });
}