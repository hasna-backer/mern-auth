import express from "express";
import {
    authUser,
    googleAuth,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/google', googleAuth);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
