//const SERVER_HOST = "api.jbgconcierge.com.au";
//const CMS_HOST = "cms.jbgconcierge.com.au";
// const SERVER_HOST = "airways_server.test";
// const CMS_HOST = "airways_cms.test";
// const SERVER_HOST = "127.0.0.1:8005";
// const CMS_HOST = "127.0.0.1:8000";
// const IDLE_TIME = 100000;
const SERVER_HOST = "13.236.207.155/airways_server/public";
const CMS_HOST = "13.236.207.155/airways_cms/public";
const IDLE_TIME = 100000;

function createURL(namespace) {
    return "http://" + SERVER_HOST + "/" + namespace;
}

function createImageURL(namespace) {
    return "http://" + CMS_HOST + namespace;
}

export { createURL, createImageURL, IDLE_TIME };
