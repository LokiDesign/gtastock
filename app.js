
/**
 * Module dependencies.
 */

var express = require('express'),
 routes = require('./routes'),
 sites = require('./routes/sites'),
 ch11 = require('./routes/sites/ch11'),
 oc2 = require('./routes/sites/oc2'),
 ra1 = require('./routes/sites/ra1'),
 ra1rooms = require('./routes/sites/ra1/rooms'),
 ch11rooms = require('./routes/sites/ch11/rooms'),
 oc2rooms = require('./routes/sites/oc2/rooms'),
 // leagues = require('./routes/leagues'),
 // rightarm = require('./routes/rightarm'),
 // franchises = require('./routes/rightarm/franchises'),
 // schedule = require('./routes/schedule'),
 // signin = require('./routes/signin'),
 // signout = require('./routes/signout')
 http = require('http'),
 path = require('path');

var flash = require('connect-flash');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.cookieParser('keyboard cat'));
app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.all('/', routes.index);
app.all('/sites', sites.index);
app.all('/ch11', ch11.index)
app.all('/oc2', oc2.index)
app.all('/ra1', ra1.index)
app.all('/ch11/:id?', ch11rooms.index)
app.all('/oc2/:id?', oc2rooms.index)
app.all('/ra1/:id?', ra1rooms.index)
// app.all('/scores', scores.index);
// app.all('/leagues', leagues.index);
// app.all('/rightarm', rightarm.index);
// app.all('/rightarm/franchises', franchises.index);
// app.all('/schedule', schedule.index);
// app.all('/signin', signin.index);
// app.all('/signout', signout.index);
// app.all('/signin/attempt', signin.controller);

// app.get('/getLeague/28655', jsonData({
//     host: 'football32.myfantasyleague.com',
//     path: '/2013/export?TYPE=league&L=28655&W=&JSON=1'
// }));

// app.get('/getSchedule', jsonData({
//     host: 'football.myfantasyleague.com',
//     path: '/2013/export?TYPE=nflSchedule&W=1&JSON=1'
// }));

// app.get('/getLeagues', jsonData({
//     host: 'football.myfantasyleague.com',
//     path: '/2013/export?TYPE=myleagues&JSON=1'
// }))


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function jsonData(values){
    return function(req, res){
        
        var http = require('http');
        var dat;

        var options = {
            qual: 'http://',
            host: values.host,
            path: values.path
        }
        var request = require('request');
        var dat;
        request = request.defaults({jar: true})
        request.cookie('USER_ID:' + req.cookies.USER_ID)
        request(options.qual + options.host + options.path, function (error, response, body) {
            
            if (!error && response.statusCode == 200) {
                console.log(req.cookies.USER_ID)
                
                var xml = body
                console.log(body)
                res.send(JSON.parse(body))
            }
        })
    }
    //     http.get(options, function(res) {
    //         var data = '';
    //         res.on('data', function (chunk){
    //             data += chunk;
    //         });
    //         res.on('end',function(){
    //             var obj = JSON.parse(data);
    //             dat = obj;
    //         })
    //     }).on('close', function(){
    //         res.send(dat);
    //     }).on('error', function(e) {
    //         console.log('ERROR: ' + e.message);
    //     });
    // }
}
