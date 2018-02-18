const { FB, t } = require('fblib');
const fb = new FB(global.FB_PAGE_TOKEN, global.FB_APP_SECRET);

const { setContext } = require('../handlers/context');

const menus = require('../messages/menus');

const DELAY = 500;

// Menu and Get Started
function getStarted (id, user) {
  setContext(id, {expecting: "nothing", step: "get_started"});
  return fb.fbMessageDelay(DELAY, id, {
    text: `Γεια σου ${user.fullname}! 😁`
  });
}

function attachmentDefaultAnswer (id) {
  setContext(id, {expecting: "nothing", step: "attachment_sent"});
  return fb.fbMessageDelay(DELAY, id, {
    text: `Προς το παρόν υποστηρίζω μόνο μηνύματα κειμένου.`
  });
}

function hodorDefault (id) {
  setContext(id, {expecting: "nothing", step: "hodor_default"});
  return fb.fbMessageDelay(DELAY, id, {
    text: `Hodor?`
  });
}

module.exports = {
  // Menu and Get Started
  getStarted,
  // Default Answers
  attachmentDefaultAnswer,
  hodorDefault
}
