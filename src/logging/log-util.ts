import { createPinoBrowserSend, createWriteStream } from "pino-logflare";
import logLevelData from "./log-level";
import pino, { Logger } from "pino";
// create pino-logflare browser stream
const send = createPinoBrowserSend({
  apiKey: process.env.PINO_API_KEY ?? "",
  sourceToken: process.env.PINO_SOURCE_TOKEN ?? "",
});
const logLevels = new Map<string, string>(Object.entries(logLevelData));
export function getLogLevel(logger: string): string {
  return logLevels.get(logger) || logLevels.get("*") || "info";
}
export function getLogger(name: string): Logger {
  return pino(
    {
      browser: {
        transmit: {
          send: send,
        },
      },
      name,
      level: getLogLevel(name),
    },
  );
}
