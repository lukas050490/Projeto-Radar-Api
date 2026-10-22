// store => cria dados
// index => lista dados
// show => exibe um dado específico
// update => atualiza dados
// delete => remover dados
import User from '../models/users.js';
import Company from '../models/companies.js';

class UserController {
  async store(req, res) {
    try {
      const { name, email, password, admin, company_id } = req.body;

      if (!password) {
        return res.status(400).json({ error: 'Senha não informada.' });
      }

      // Verifica se empresa existe
      const company = await Company.findByPk(company_id);
      if (!company) {
        return res.status(400).json({ error: 'Empresa não encontrada.' });
      }

      // Verifica e-mail duplicado
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      const user = await User.create({
        name,
        email,
        password,
        admin,
        company_id,
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        company_id: user.company_id,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // GET /users
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'admin', 'company_id'],
        include: [
          {
            model: Company,
            as: 'company',
            attributes: ['id', 'name'],
          },
        ],
        order: [['created_at', 'DESC']],
      });

      return res.json(users);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // GET /users/:id
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'name', 'email', 'admin', 'company_id'],
        include: [
          {
            model: Company,
            as: 'company',
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // PUT /users/:id
  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      const { name, email, password, admin, company_id } = req.body;

      // E-mail duplicado
      if (email && email !== user.email) {
        const emailInUse = await User.findOne({ where: { email } });
        if (emailInUse) {
          return res.status(400).json({ error: 'E-mail já cadastrado.' });
        }
      }

      // Empresa existe?
      if (company_id && company_id !== user.company_id) {
        const company = await Company.findByPk(company_id);
        if (!company) {
          return res.status(400).json({ error: 'Empresa não encontrada.' });
        }
      }

      await user.update({ name, email, password, admin, company_id });

      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        company_id: user.company_id,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // DELETE /users/:id
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      await user.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new UserController();
