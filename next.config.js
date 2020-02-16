const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require("next/constants");

module.exports = phase => {
  const env = {
    API_URL: (() => {
      if (phase === PHASE_DEVELOPMENT_SERVER) {
        return "http://localhost:5000";
      }
      if (phase === PHASE_PRODUCTION_BUILD) {
        return "https://fast-oasis-98847.herokuapp.com";
      }
    })()
  };
  return { env };
};
