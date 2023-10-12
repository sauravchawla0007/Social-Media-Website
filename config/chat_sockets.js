module.exports.chatSockets = function(socketServer){
    // let io = require('socket.io')(socketServer);
    let io = require('socket.io')(socketServer, {
        // Fixing the cors issue
        cors: {
            origin: "http://localhost:8000",
            credentials: true
        },
        allowEIO3: true // false by default
    });

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

    });

}