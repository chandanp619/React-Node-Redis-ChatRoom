const redis = require('redis');
const http = require('http');
const { Server } = require("socket.io");

// Create Redis client
const redisClient = redis.createClient();
const subscriber = redisClient.duplicate();
const publisher = redisClient.duplicate();

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Initialize Redis clients
(async () => {
    await subscriber.connect();
    await publisher.connect();
})();

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {

    // Subscribing to a channel
    socket.on('subscribe', async (channel) => {
        // Subscribe the Redis client
        await subscriber.subscribe(channel, (message) => {
            socket.emit('message', message); // Emit the message to the client
        });
    });

    // Unsubscribing from a channel
    socket.on('unsubscribe', async (channel) => {
        await subscriber.unsubscribe(channel);
        socket.emit('message', `Unsubscribed from channel: ${channel}`);
    });

    // Sending a message to a channel
    socket.on('message', (data) => {
        publisher.publish(data.channel, data.message); // Publish to the Redis channel
    });

    // add new channel
    socket.on('add-channel', async(data) => {
        await publisher.publish(data.channel,  data.message); // Publish to the Redis channel
        socket.emit('channels', [data.channel]); // Emit the message to the client
    });

    // get channels
    socket.on('get-channels', async() => {
        try {
            // Fetch the list of channels
            await subscriber.subscribe('channels');
            const channels = await subscriber.sendCommand(['PUBSUB', 'CHANNELS']);
            console.log("channelsX",channels);
            socket.emit('channels', channels);
        } catch (err) {
            console.error('Error fetching channels:', err);
            socket.emit('channels', []); // Return an empty list if an error occurs
        }
    });

    // Handling disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start the server
server.listen(8083, () => {
    console.log('Listening on *:8083');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await subscriber.quit();
    await publisher.quit();
    process.exit(0);
});
