import express from 'express';
import { info_user } from '../controller/info_user';


const router_user = Express.Router()

router_user.get('/:id', info_user)

export default router_user