import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import authConfig from '../../config/auth.js';

class SessionController {
    async store(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
            }

            const passwordMatch = await user.checkPassword(password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
            }

            const { id, name, company_id, admin } = user;

            const token = jwt.sign(
                { id, company_id, admin },
                authConfig.secret,
                { expiresIn: authConfig.expiresIn },
            );

            return res.json({
                user: { id, name, email, company_id, admin },
                token,
            });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export default new SessionController();