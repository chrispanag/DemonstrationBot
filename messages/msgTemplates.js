const _ = require('lodash');

const { fbApp, t } = require('fblib');
const fb = fbApp(FB_PAGE_TOKEN, FB_APP_SECRET);

const { setContext } = require('../Handlers/contextHandler');

const m = require('../src/menus');

const DELAY = 500;

// Menu and Get Started

function getStarted (id, user) {
  setContext(id, {expecting: "nothing", step: "get_started"});
  return fb.startsTyping(id).then(() => {
    return fb.fbMessage(id, `Γεια σου ${user.first_name} :D`).then(() => {
      return fb.chainFbMessages(DELAY, id, [
        `Στείλε μου την τοποθεσία σου στο Messenger ή την γραμμή και την στάση που θες, για να σου πω σε πόση ώρα θα έρθει το λεωφορείο σου!`,
        {
          text: `Tο Πότε έρχεται το λεωφορείο μου λειτουργεί προς το παρόν μόνο για τα λεωφορεία του ΟΑΣΑ στην περιοχή της Αττικής :)`,
          quickreplies: ["send_location", {text: "Zero Facebook", payload: {type: "fb0_info"}}],
          templateID: "GREETING"
        }
      ]);
    });
  });
}

module.exports = {
  getStarted
}