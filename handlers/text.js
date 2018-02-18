const { FB } = require('fblib');
const fb = new FB(global.FB_PAGE_TOKEN, global.FB_APP_SECRET);

function textHandler (message, id, nlp, user) {
    const msg = message.text;
    return fb.startsTyping(id).then(() => {
        switch (msg.toUpperCase()) {
            case "HODOR": return fb.fbMessage(id, "Hodor?");
            default: throw new Error("Unrecognized text Message");
        }
    });
}

module.exports = {
    textHandler
};
