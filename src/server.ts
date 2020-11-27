import express from "express";
import { HealthcheckerDetailedCheck, HealthcheckerSimpleCheck } from "./healthchecker/healthchecker";
import { HealthTypes } from "./interfaces/types";

const server = express();

server.get("/", (_, res) => {
  res.send("Hello ts-node!");
});

server.get("/health-check/liveness", (_, res) => {
  res.send(HealthcheckerSimpleCheck());
});

server.get("/health-check/readiness", async (_, res) => {
  res.send(
    await HealthcheckerDetailedCheck({
      name: "My node application",
      version: "my version",
      integrations: [
        {
          type: HealthTypes.Redis,
          name: "redis integration",
          host: "localhost",
        },
        {
          type: HealthTypes.MongoDb,
          name: "MongoDb integration",
          uri: "mongodb://localhost:27017/checker",
        },
        {
          type: HealthTypes.Web,
          name: "my web api integration",
          host: "https://github.com/status",
          headers: [{ key: "Accept", value: "application/json" }],
        },
      ],
    })
  );
});

export default server;
