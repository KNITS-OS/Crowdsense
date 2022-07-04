/* eslint-disable @typescript-eslint/no-var-requires */
const candidatesData = require("./candidates");
const workflowData = require("./workflow");

module.exports = () => ({
  candidates: candidatesData,
  workflow: workflowData,
});
