const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.render('index')
})

// const users = {}

io.on('connection', socket => {
    socket.on('new-user-joined', userId => {
        // users[socket.id] = userId
        socket.broadcast.emit('user-joined', userId)

    socket.on('send', message =>{
            socket.broadcast.emit('receive', {message: message, userId: userId})
    })
    
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-left', userId)
        // delete users[socket.id]
        })
    })
})

server.listen(3000)