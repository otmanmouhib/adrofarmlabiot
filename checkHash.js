const bcrypt = require('bcryptjs');
const hash = '$2a$10$XcC8w2h4h7h.8ydikX6fJOUI2jhtAnKDvVby6pm5XMR358g20pmZO';
console.log(bcrypt.compareSync('Test1234!', hash));
