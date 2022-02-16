import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();

import { getSavePost, savePost, signin, signup, updateUser } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.patch('/:id', auth, updateUser);
router.post('/save',savePost);
router.get('/save',getSavePost);


export default router;