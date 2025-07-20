
import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Administrator',
        password: bcrypt.hashSync('12345678', 10),
        email: 'admin@email.com',
        isAdmin: true,
    },
    {
        name: 'John Doe',
        password: bcrypt.hashSync('12345678', 10),
        email: 'JohnD@email.com',
    },
    {
        name: 'Susie Queue',
        password: bcrypt.hashSync('12345678', 10),
        email: 'SuzeQ@email.com',
    },
];

export default users;