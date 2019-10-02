import express from 'express';
import comment from '../controllers/comments';
import loggedInUser from '../middleware/loggedInUser';
import tokenVerification from '../middleware/tokenVerification';
import paramCheck from '../middleware/parameterCheck';
import Validate from '../middleware/validation';

const router = express.Router();
router.post('/commentes/:id', tokenVerification, paramCheck.parameterCheck, Validate.addComment, comment.createComment);
router.patch('/commentes/:id', tokenVerification, paramCheck.parameterCheck, comment.flagComment);
router.delete('/commentes/:id', tokenVerification, loggedInUser.isAllowedToDcmt, paramCheck.parameterCheck, comment.deleteComment);

export default router;