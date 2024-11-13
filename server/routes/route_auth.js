import express from 'express';
import { cadastro, login } from '../controller/authentication.js';


const router_auth = Express.Router()

router_auth.post('/cadastro', cadastro)

router_auth.post('/login', login)

export default router_auth