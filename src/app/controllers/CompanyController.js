import Company from '../models/companies.js';
import User from '../models/users.js';

class CompanyController {
  // POST /companies
  async store(req, res) {
    try {
      const { name, cnpj, email, phone } = req.body;

      if (cnpj) {
        const companyExists = await Company.findOne({ where: { cnpj } });
        if (companyExists) {
          return res.status(400).json({ error: 'CNPJ já cadastrado.' });
        }
      }

      const company = await Company.create({
        name,
        cnpj,
        email,
        phone,
      });

      return res.status(201).json(company);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // GET /companies
  async index(req, res) {
    try {
      const companies = await Company.findAll({
        attributes: ['id', 'name', 'cnpj', 'email', 'phone'],
        order: [['created_at', 'DESC']],
      });

      return res.json(companies);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // GET /companies/:id
  async show(req, res) {
    try {
      const company = await Company.findByPk(req.params.id, {
        attributes: ['id', 'name', 'cnpj', 'email', 'phone'],
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['id', 'name', 'email', 'admin'],
          },
        ],
      });

      if (!company) {
        return res.status(404).json({ error: 'Empresa não encontrada.' });
      }

      return res.json(company);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // PUT /companies/:id
  async update(req, res) {
    try {
      const company = await Company.findByPk(req.params.id);

      if (!company) {
        return res.status(404).json({ error: 'Empresa não encontrada.' });
      }

      const { cnpj } = req.body;

      if (cnpj && cnpj !== company.cnpj) {
        const cnpjInUse = await Company.findOne({ where: { cnpj } });
        if (cnpjInUse) {
          return res.status(400).json({ error: 'CNPJ já cadastrado.' });
        }
      }

      await company.update(req.body);

      return res.json(company);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // DELETE /companies/:id
  async delete(req, res) {
    try {
      const company = await Company.findByPk(req.params.id);

      if (!company) {
        return res.status(404).json({ error: 'Empresa não encontrada.' });
      }

      await company.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new CompanyController();