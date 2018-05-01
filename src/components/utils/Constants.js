const SERVER_HOST = 'api.jbgconcierge.com.au';
const CMS_HOST = 'cms.jbgconcierge.com.au';
const IDLE_TIME = 10000;

function createURL(namespace) {
    return 'http://' + SERVER_HOST + '/' + namespace;
}

function createImageURL(namespace) {
    return 'http://' + CMS_HOST + namespace;
}

export { createURL, createImageURL, IDLE_TIME };
