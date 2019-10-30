import express from 'express';
import { defaultHandler } from '@reshuffle/server-function';
import { get } from '@reshuffle/db';
import fetch from 'node-fetch';

const LINKS = 'links';

const app = express();

var fs = require('fs');
var https = require('https');

app.get('/embed', async (_, res) => {
    var links = await get(LINKS);
    var index = Math.floor(Math.random() * links.length);
    var url = links[index];
    res.set({ 'Content-Type': 'image/png' });
    fetch(url)
        .then(res => res.buffer())
        .then(body => res.end(body));

});


app.use(defaultHandler);

export default app;