import { Router } from 'express';
import CompanyController from './app/controllers/CompanyController.js';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import authMiddleware from './middlewares/auth.js';

const routes = new Router();


routes.post('/companies', CompanyController.store);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// Companies
routes.get('/companies', CompanyController.index);
routes.get('/companies/:id', CompanyController.show);
routes.put('/companies/:id', CompanyController.update);
routes.delete('/companies/:id', CompanyController.delete);

// Users
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);


export default routes;
