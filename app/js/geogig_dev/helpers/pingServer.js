$.extend($, {
    Ping: function Ping(url, timeout) {
        timeout = timeout || 1500;
        var timer = null;

        return $.Deferred(function deferred(defer) {

            var img = new Image();
            img.onload = function () { success("onload"); };
            img.onerror = function () { success("onerror"); };  
            // onerror is also success, because this means the domain/ip is found, only the image not;

            var start = new Date();
            img.src = url += ("?cache=" + +start);
            timer = window.setTimeout(function timer() { fail(); }, timeout);

            function cleanup() {
                window.clearTimeout(timer);
                timer = img = null;
            }

            function success(on) {
                cleanup();
                defer.resolve(true, url, new Date() - start, on);
            }

            function fail() {
                cleanup();
                defer.reject(false, url, new Date() - start, "timeout");
            }

        }).promise();
    }
});

class ping {
    static server(ip) {
        return new Promise((resolve, reject) => {
            $.Ping(ip)
            .done((success, url, time, on) =>{
                resolve('The geogig serve is ON')
            }).fail((failure, url, time, on) =>{
                reject('The geogig serve is OFF')
            })
        })
    }
    static checkServerisOnAndKillProcess (){
        return this.server('http://localhost:8182/repos')
            .then(Utils.killServer())
            .catch(q=> q)
    }
}



