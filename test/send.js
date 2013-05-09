var a = require('../lib/send').arguments;

var test = require('tap').test;

var checks = function(desc, o1, o2) {
    console.log(desc);
    console.log(o1, o2);
    test(desc, function(t) {
        for (var key in o2)
            t.deepEqual(o2[key], o1[key]);    
        t.end();
    });
}


checks('just code', 
       a(100), {
           code: 100
       });

checks('code and json', 
       a(404, {err: null}), {
           code: 404, 
           data: JSON.stringify({err:null})
       });

checks('code header json', 
       a(302, {location: 'http://google.com'}, {err: null}), {
           code: 302, 
           headers:{'content-type': 'application/json', location:'http://google.com'}, 
           data: JSON.stringify({err:null})
       });

checks('just json', 
       a({done: true}), {
           code: 200, 
           data: JSON.stringify({done:true})
       });

checks('just buffer',
       a(new Buffer('hello')), {
           code: 200,
           headers: {}
       });
