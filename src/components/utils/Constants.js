const HOST = '192.168.10.10';

function createURL(namespace) {
    return 'http://' + HOST + '/' + namespace;
}

export { createURL };
