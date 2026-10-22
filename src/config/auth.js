if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não definido no .env');
}

export default {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};