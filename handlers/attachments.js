const { FB } = require('fblib');
const fb = new FB(global.FB_PAGE_TOKEN, global.FB_APP_SECRET);

function attachmentHandler (id, atts, user) {
    return Promise.all(atts.map(a => fb.fbMessage(id, "Επιτρέπονται μόνο μηνύματα κειμένου προς το παρόν...")));
}

module.exports = {
    attachmentHandler
};
