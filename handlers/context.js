/*
    The context module is the one responsible for storing the state of conversation of each user, as well as his name, gender and other info.
    Whenever a user sends a message to our bot, the getContext method is initiated which embeds the "user" object inside the messaging object.

    In this implementation, the context is handled "in memory". If you want to change the storage to a DB or Redis you only need to change the 
    retrieveUser, storeUser and setContext methods.
*/

const { FB } = require('fblib');
const { getUserData } = new FB(global.FB_PAGE_TOKEN, global.FB_APP_SECRET);

// Global Context Object. It stores contexts in memory
const contexts = {};

// The data requested per user that initiates an interaction with the bot
const dataPerUser = [
    'first_name', 
    'last_name',
    'gender'
];

function getContext (messaging) {
    const id = messaging.sender.id;
    
    return retrieveUser(id).then(user => {
        // If we already have the user stored (a session exists)
        if (user) {
            // Retrieve it
            messaging.user = user;
            return messaging;
        }

        // If we don't have the user stored (a session doesn't exist)
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

// Private Functions
function retrieveUser (id) {
    return Promise.resolve(contexts[id]);
}

function storeUser (id, user) {
    contexts[id] = user;
    return Promise.resolve();
}
