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

  it('should show typing ', function(done) {
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
    const newMessage = chat.typing(socket);
  });
});


