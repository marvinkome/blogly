const express = require('express');
const next = require('next');
const path = require('path');
const url = require('url');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src' });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(function() {
        const server = express();

        server.get('/profile/:user', (req, res) => {
            const actualPage = '/profile';
            const queryParams = { user: req.params.user };
            app.render(req, res, actualPage, queryParams);
        });

        server.get('/p/:id', (req, res) => {
            const actualPage = '/post';
            const queryParams = { id: req.params.id };
            app.render(req, res, actualPage, queryParams);
        });

        server.get('/me/edit-post/:id', (req, res) => {
            const actualPage = '/me/edit-post';
            const queryParams = { id: req.params.id };
            app.render(req, res, actualPage, queryParams);
        });

        server.get('*', function(req, res) {
            const parsedUrl = url.parse(req.url, true);
            const rootStaticFiles = ['/robots.txt', '/sitemap.xml', '/sitemap.xsl'];

            if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
                const _path = path.join(__dirname, 'static', parsedUrl.pathname);

                app.serveStatic(req, res, _path);
            } else {
                return handle(req, res);
            }
        });

        server.listen(port, function(err) {
            if (err) throw err;

            console.log('> Ready on http://localhost:3000'); //eslint-disable-line
        });
    })
    .catch(function(ex) {
        console.error(ex.stack); // eslint-disable-line
        process.exit(1);
    });
