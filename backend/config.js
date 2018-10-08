var config = {};

config.twitter = {};
config.redis = {};
config.web = {};
config.app = {};
config.db = {};

config.default_stuff =  ['red','green','blue','apple','yellow','orange','politics'];
config.twitter.user_name = process.env.TWITTER_USER || 'username';
config.twitter.password=  process.env.TWITTER_PASSWORD || 'password';
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'hostname';
config.redis.port = 6379;
config.web.port = process.env.WEB_PORT || 9980;
config.app.securedpath = '/api';	//this will be the secured api path from root
config.app.jwtsecret = '936ee7cf-b0f6-4140-909b-926694c2ac80';



config.app.views = '../webui';
//configure database properties

//config.db.host = "us-cdbr-azure-west-b.cleardb.com";
//config.db.user = "b8d7dccac78d6a";
//config.db.password = "9293cbd8";
//config.db.database = "trooworkdb";

config.db.host = "localhost";
//    config.db.host = "192.168.1.113";
config.db.user = "root";
config.db.password = "0726ztzs.";
config.db.database = "trooworkdb";

module.exports = config;
