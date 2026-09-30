import Sequelize, { Model } from 'sequelize';

class Company extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                cnpj: Sequelize.STRING,
                email: Sequelize.STRING,
                phone: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'companies',
            },
        );

        return this;
    }

    static associate(models) {
        this.hasMany(models.User, {
            foreignKey: 'company_id',
            as: 'users',
        });

        // Quando criarmos as outras models, adicionamos aqui:
        // this.hasMany(models.Customer, { foreignKey: 'company_id', as: 'customers' });
        // this.hasMany(models.Product,  { foreignKey: 'company_id', as: 'products'  });
        // this.hasMany(models.Sale,     { foreignKey: 'company_id', as: 'sales'     });
        // this.hasMany(models.Alert,    { foreignKey: 'company_id', as: 'alerts'    });
    }
}

export default Company;