const express = require('express');
const indexRoute = require('./routes/indexRoute');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
