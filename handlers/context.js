const { FB } = require('fblib');
const { getUserData } = new FB(global.FB_PAGE_TOKEN, global.FB_APP_SECRET);

const dataPerUser = [
    'first_name', 
    'last_name',
    'gender'
];

const contexts = {};

function getContext (messaging) {
    const id = messaging.sender.id;
    
    return retrieveUser(id).then(user => {
        if (user) {
            messaging.user = user;
            return messaging;
        }

        return getUserData(id, dataPerUser).then(userData => {
            userData.id = id;
            userData.context = {};
            storeUser(id, userData);
            messaging.user = userData;
            return messaging;
        });
    });
}

function setContext (id, context) {
    contexts[id].context = context;
}

module.exports = {
    getContext,
    setContext
};

function retrieveUser (id) {
    return Promise.resolve(contexts[id]);
}

function storeUser (id, user) {
    contexts[id] = user;
}
