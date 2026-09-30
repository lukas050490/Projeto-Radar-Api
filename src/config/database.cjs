module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'projeto-radar-db',
    define: {
        timestamps: true,
        undercored: true,
        underscoredAll: true,
    }
}