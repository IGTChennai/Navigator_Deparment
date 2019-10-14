import { login, logout} from '../utils/auth';
import { envSettings } from '../server.config';
import { data } from './data/login.data';

beforeAll(async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    jasmine.DEFAULT_TIMEOUT_INTERVAL = envSettings.testTimeout;
    await login(data.user, data.password);
});

afterAll(async () => {
    await logout();
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
})