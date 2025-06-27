import 'dotenv/config';
import express from 'express';
import { SignUpController } from './controllers/SignUpController';
import { GetPersonalInfoController } from './controllers/GetPersonalInfoController';
import { SignInController } from './controllers/SignInController';
import { RefreshTokenController } from './controllers/RefreshTokenController';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();
app.use(express.json());

app.post('/signup', SignUpController.handle);
app.post('/signin', SignInController.handle);
app.post('/refresh-token', RefreshTokenController.handle);

app.get('/personal-info/:userId', authMiddleware, GetPersonalInfoController.handle);

app.listen(3000, () => {
  console.log('> Server is now listening on http://localhost:3000');
});
