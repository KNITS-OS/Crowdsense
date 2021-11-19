import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  snapshotSerializers: ["jest-emotion"],
  setupFilesAfterEnv: ["./config/jest.js"],
};

export default config;
