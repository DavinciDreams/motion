module.exports = {
  async headers() {
    return [
      {
        source: "/api/ws",
        headers: [
          { key: "Upgrade", value: "websocket" },
          { key: "Connection", value: "Upgrade" },
        ],
      },
    ];
  },
};