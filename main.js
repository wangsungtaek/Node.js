var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
        if(queryData.id === undefined){
            fs.readdir('./data', function(error, filelist){
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = template.list(filelist);
                var html = template.HTML(title, list,
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">Create</a>`
                    );

                response.writeHead(200);
                response.end(html);
            });

        } else {
            fs.readdir('./data', function(error, filelist){
                var filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
                    var title = queryData.id;
                    var list = template.list(filelist);
                    var html = template.HTML(title, list,
                        `<h2>${title}</h2>${description}`,
                        `<a href="/create">Create</a>
                         <a href="/update?id=${title}">Update</a>
                         <form action="/delete_process" method="post">
                            <input type="hidden" name="id" value="${title}">
                            <input type="submit" value="delete"/>
                         </form>`
                        );

                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    } else if(pathname === '/create'){
        fs.readdir('./data', function(error, filelist){
            var title = 'Web - Create';
            var list = template.list(filelist);
            var html = template.HTML(title, list,`
                <form action="/create_process" method="post">
                    <p><input type="text" placeholder="title" name="title"></p>
                    <p><textarea placeholder="description" name="description"></textarea></p>
                    <p><input type="submit"></p>
                </form>`,
                '');

            response.writeHead(200);
            response.end(html);
        });
    } else if(pathname === '/create_process'){
        var body = '';

        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(data){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf-8', function(err){
                response.writeHead(302, {Location:`/?id=${title}`});
                response.end();
            });
        });
    } else if(pathname === '/update') {
        fs.readdir('./data', function(error, filelist){
            var filteredId = path.parse(queryData.id).base;
            fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
                var title = queryData.id;
                var list = template.list(filelist);
                var html = template.HTML(title, list,
                    `<form action="/update_process" method="post">
                        <input type="hidden" name="id" value="${title}"/>
                        <p><input type="text" placeholder="title" name="title" value="${title}"></p>
                        <p><textarea placeholder="description" name="description">${description}</textarea></p>
                        <p><input type="submit"></p>
                     </form>`,
                    `<a href="/create">Create</a> <a href="/update?id=${title}">Update</a>`
                    );

                response.writeHead(200);
                response.end(html);
            });
        });
    } else if(pathname === '/update_process'){
        var body = '';

        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(data){
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            console.log(post);
            fs.rename(`data/${id}`, `data/${title}`, function(error){
                fs.writeFile(`data/${title}`, description, 'utf-8', function(err){
                    response.writeHead(302, {Location:`/?id=${title}`});
                    response.end();
                });
            });
        });
    } else if(pathname === '/delete_process'){
        var body = '';

        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(data){
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(id).base;

            fs.unlink(`data/${filteredId}`, function(error){
                response.writeHead(302, {Location:`/`});
                response.end();
            });
        });
    }
    else {
        response.writeHead(404);
        response.end("Not found");
    }
});
app.listen(3000);