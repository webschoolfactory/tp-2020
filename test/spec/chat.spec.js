const assert = require('assert');

const chat = require('../../chat');

describe('chat', function() {
  it('should broadcast new message', function(done) {
    const socket = {
      broadcast: {
        emit: function(type, msg) {
          assert.deepEqual(type, 'new message');
          assert.deepEqual(msg, {
            username: 'loic',
            message: 'yolo'
          });
          done();
        }
      }
    };
    socket.username = 'loic';
    const newMessage = chat.newMessage(socket);
    newMessage('yolo');
  });

  it('should show typing', function(done) {
    const socket = {
      broadcast: {
        emit: function(type, msg) {
          assert.deepEqual(type, 'typing');
          assert.deepEqual(msg, {
            username: 'loic'
          });
          done();
        }
      }
    };
    socket.username = 'loic';
    const typing = chat.typing(socket);
    typing();
  });

  it('should add new user', function(done) {
    const socket = {
      emit: function(type, msg) {
        assert.deepEqual(type, 'login');
         assert.deepEqual(msg, {
            numUsers: 1
          });
      },
      broadcast: {
        emit: function(type, msg) {
          assert.deepEqual(type, 'user joined');
          assert.deepEqual(msg, {
            username: 'loic',
            numUsers: 1
          });
          done();
        }
      }
    };
    socket.username = 'loic';
    const addUser = chat.addUser(socket);
    addUser('loic');
  });

    it('should not add user', function(done) {
    const socket = {
      emit: function(type, msg) {
        done(new Error('should not be executed'));
      }
    };
    socket.username = 'loic';
    socket.addedUser = true;
    const addUser = chat.addUser(socket);
    addUser('loic');
    done();
  });

  it('should stop typing', function(done) {
    const socket = {
      broadcast: {
        emit: function(type, msg) {
          assert.deepEqual(type, 'stop typing');
          assert.deepEqual(msg, {
            username: 'loic'
          });
          done();
        }
      }
    };
    socket.username = 'loic';
    const stopTyping = chat.stopTyping(socket);
    stopTyping();
  });

  it('should show disconnect', function(done) {
    const socket = {
      broadcast: {
        emit: function(type, msg) {
          assert.deepEqual(type, 'user left');
          assert.deepEqual(msg, {
            username: 'loic',
            numUsers: 0
          });
          done();
        }
      }
    };
    socket.username = 'loic';
    socket.addedUser = true;
    const disconnect = chat.disconnect(socket);
    disconnect('loic');
  });

  it('should show not disconnect', function(done) {
    const socket = {
      broadcast: {
        emit: function(type, msg) {
          done(new Error('should not execute this code'));
        }
      }
    };
    socket.username = 'loic';
    socket.addedUser = false;
    const disconnect = chat.disconnect(socket);
    disconnect('loic');
    done();
  });
});


