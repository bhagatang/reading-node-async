
const emmiter = () => {
    let events = {};
    const ee = {
        // прослушивание событий
        on: (name, f, timeout = 0) => {
            const event = events[name] || [];
            events[name] = event;
            event.push(f);
            if(timeout) setTimeout(() => {
                ee.remove(name, f);
            }, timeout);
        },
        // вызов события
        emit: (name, ...data) => {
            const event = events[name];
            if(event) event.forEach(f => f(...data));
        },
        // обертка 'g' 
        once: (name, f) => {
            const g = (...a) => {
                ee.remove(name, g);
                f(...a);
            };
            ee.on(name, g);
        },
        // удаление функции обработчика 
        remove: (name, f) => {
            const event = events[name];
            if(!event) return;
            const i = event.indexOf(f);
            if(i !== -1) event.splice(i, 1);
        },
        // удаление события
        clear: name => {
            if(name) delete events[name];
            else events = {};
        },
        // вывод количества функций обработчиков данного события
        count: name => {
            const event = events[name];
            return event ? event.length : 0;
        },
        // вывод копии массива обработчиков
        listeners: name => {
            const event = events[name];
            return event.slice();
        },
        // вывод имен всех событий
        names: () => Object.keys(events)
    };
    return ee;
};

const ee = emmiter();

// метод on и вызов события методом emit
ee.on('e1', data => {
    console.dir(data);
});

ee.emit('e1', { msg: 'событие e1' });

// метод once 
ee.once('e2', data => {
    console.dir(data);
});

ee.emit('e2', { msg: 'событие e2' });
ee.emit('e2', { msg: 'none' });

// метод remove 
const func = data => {
    console.dir(data);
};

ee.on('e3', func);
ee.emit('e3', { msg: 'событие e3' });
ee.remove('e3', func);
ee.emit('e3', { msg: 'none' });

// метод count
ee.on('e4', () => {});
ee.on('e4', () => {});
ee.on('e4', () => {});
console.log('e4 count:', ee.count('e4'));

// метод clear(n)/crear()
ee.clear('e4');

ee.emit('e4', { msg: 'none' });
ee.emit('e1', { msg: 'e1' });

ee.clear();
ee.emit('e1', { msg: 'none' });

// методы listeners и names
ee.on('e5', () => {});
ee.on('e5', func);
ee.on('e6', () => {});
ee.on('e7', () => {});

console.log('listeners:', ee.listeners('e5'));
console.log('names:', ee.names());