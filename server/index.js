const express = require('express');
const app = express();

app.get('/api/musicians', (req, res, next)=> {
    res.send([
        { id: 1, name: 'Morgan Wallen'},
        { id: 2, name: 'Ty Myers'},
        { id: 3, name: 'Tate Mcrae'},
    ]);
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));