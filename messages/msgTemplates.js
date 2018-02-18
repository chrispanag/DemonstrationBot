const { FB, t } = require('fblib');
const fb = new FB(global.FB_PAGE_TOKEN, global.FB_APP_SECRET);

const { setContext } = require('../handlers/context');

const m = require('../messages/menus');

const DELAY = 500;

// Menu and Get Started

function getStarted (id, user) {
  setContext(id, {expecting: "nothing", step: "get_started"});
  return fb.fbMessage(DELAY, id, {
    text: `Γεια σου ${user.first_name}! 😁`
  });
}

module.exports = {
  getStarted
}
