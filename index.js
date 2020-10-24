const express = require('express');
const app = express();
const port = process.env.HTTP_PORT || 3000;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server started and listening at http://localhost:${port}`);
});