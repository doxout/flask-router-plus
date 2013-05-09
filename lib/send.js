
exports.arguments = function arguments(code, headers, data) {
    // .send(data), .send(code) or .send(code, data)
    if (null == data) { 
        data = headers;
        headers = {};
    }
    // .send(data)
    if (null == data && typeof(code) != 'number') { 
        data = code;
        code = 200;
    }
    var ctype;
    if (typeof(data) == 'string') {
        ctype = 'text/html; charset=utf-8';
    } else if (null != data && !(data instanceof Buffer)) {
        ctype = 'application/json';
        data = JSON.stringify(data);
    }
    if (ctype && !headers['content-type']) 
        headers['content-type'] = ctype;
    return {code: code, headers: headers, data: data};
};
