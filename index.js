const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');
const db = require('./models');
const PORT = process.env.PORT || 8081;
const keys = require('./config/keys');

app.use(cors());
app.use(bodyParser.json());

/* routes below */
app.use('/api/auth', authRoutes);
app.use(
  '/api/users/:id/messages',
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
);

app.get('/api/messages', loginRequired, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: 'desc' })
      .populate('user', {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

// app.use(function(req, res, next) {
//   let err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// app.use(errorHandler);

// make express use react routes
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('warbler-client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'warbler-client', 'build', 'index.html')
    );
  });
}

if (process.env.NODE_ENV === 'production') {
  // express serves production assets (i.e. main.js, main.css)
  app.use(express.static('warbler-client/build'));

  // express serve index.html if non-express route(react routes)
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'warbler-client', 'build', 'index.html')
    );
  });
}

app.listen(PORT, function() {
  console.log(`Server is starting on port ${PORT}`);
  console.log(`keys.mongoUri is ${keys.mongoUri}`);
});
