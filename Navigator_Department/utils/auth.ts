import * as request from 'supertest';

import { envSettings } from "../server.config";
import { repUrls } from '../tests/data/urls';

export const TIMEOUTS = { long: 50000, short: 2000, tiny: 500 };

/**
 * Login and return Token
 * @param  {string} user
 * @param  {string} password
 */
export async function login(user: string, password: string): Promise<{ Authorization: string }> {
    console.log('serverUrl: '+envSettings.serverUrl);
    const res = await request(envSettings.serverUrl)
        .post(repUrls.auth.login)
        .set(commonheaders)
        .send({
            userName: user,
            password: password
        })
        .then(res => {
            //console.log(JSON.stringify(res));
            return res;
        })

    if (res.body.token) {
        commonheaders['Authorization'] = 'ESMS ' + res.body.token;
    }
    return res.body.token ? { Authorization: 'ESMS ' + res.body.token } : null;
}

export async function logout() {
    try {
        return request(envSettings.serverUrl)
            .delete(repUrls.auth.logout)
            .set(commonheaders)
            .send();
    }
    catch (reason) {
        return null;
    }
}

export let commonheaders: any = {
    "Accept": "application/json, text/plain, */*",
    "x-locale": "en_US",
    "Origin": "https: //xxmkt1069",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    "DNT": 1,
    "Content-Type": "application/json;charset=UTF-8",
    "Referer": "https: //xxmkt1069/navigator/",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9,hi;q=0.8,te;q=0.7"
};
