import bcrypt from 'bcryptjs';

const users = [
    {
        firstName: 'Administrator',
        lastName: 'I.T.',
        password: bcrypt.hashSync('12345678', 10),
        primaryEmail: 'admin@email.com',
        isAdmin: true,
    },
    {
        firstName: 'John',
        lastName: 'Doe',
        password: bcrypt.hashSync('12345678', 10),
        primaryEmail: 'JohnD@email.com',
    },
    {
        firstName: 'Susie',
        lastName: 'Queue',
        password: bcrypt.hashSync('12345678', 10),
        primaryEmail: 'SuzeQ@email.com',
    },
];

export default users;