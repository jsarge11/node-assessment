const express = require('express'),
      bodyParser = require('body-parser'),
      user = require('./usersCtrl')


let app = express();

app.use(bodyParser.json())
app.get('/api/users', user.read)
app.get('/api/users/:userId', user.readID)
app.get('/api/admins', user.admins);
app.get('/api/nonadmins', user.nonadmins);
app.get('/api/user_type/:type', user.readtype);
app.put('/api/users/:userId', user.update);
app.post('/api/users', user.create);
app.delete('/api/users/:userId', user.delete);


app.listen(3000, () => console.log('Listening on port 3000'));



