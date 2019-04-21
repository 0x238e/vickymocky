const ax = require('axios');
const fk = require('./faker');

const to = '0x02275aEdd72D6406D20A21De9837737dc8501dC2';

function gMock() {
  const d = [{
    type: 'new',
    event: {
      id: fk.random.uuid(),
      type: {
        name: ['asd', 'bsd', 'csd'][Math.floor(Math.random() * 3)],
        level: ['is-primary', 'is-danger', 'is-warning'],
      },
      type: [{
        name: '竞争',
        level: 'is-primary',
      }, {
        name: '超车',
        level: 'is-danger',
      }, {
        name: '换道',
        level: 'is-warning',
      }][Math.floor(Math.random() * 3)],
      from: fk.finance.ethereumAddress(),
      to,
      expire: Number(Date.now()) + 2000,
      price: Math.floor(Math.random() * 400 + 100),
      userlevel: Math.floor(Math.random() * 10),
      data: {
        gps: [fk.address.latitude(), fk.address.longitude()]
      },
    },
  }];
  return d;
}

function gMockUp(d) {
  const x = d[0];
  x.type = 'update';
  x.event.decider = 'car';
  x.event.status = ['accept', 'reject'][Math.floor(Math.random() * 2)];
  return [x];
}


function cb() {
  const d = gMock();
  ax.post('http://api.v.noinfinity.top/event', d);
  setTimeout(cb, Math.random() * 3000 + 2000);
  setTimeout(() => {
    ax.post('http://api.v.noinfinity.top/event', gMockUp(d));
  }, 3000);
}

cb()
