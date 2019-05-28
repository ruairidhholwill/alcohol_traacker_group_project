const PubSub = {
    publish: function(channel, payload) {
        console.log(`Published on ${channel}`)
        console.log('payload', payload)
        const event = new CustomEvent(channel, {
            detail: payload
        });
        document.dispatchEvent(event);
    },
    subscribe: function(channel, callback) {
        console.log(`Subscribed on ${channel}`)
        document.addEventListener(channel, callback);
    }
};

module.exports = PubSub;