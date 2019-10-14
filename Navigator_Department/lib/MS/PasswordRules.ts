import * as request from 'supertest';

export function create_PasswordRules(hosturl, endpointurl, headers, data): Promise<any> {
    return request(hosturl)
        .post(endpointurl)
        .set(headers)
        .send(data);
}
export function read_PasswordRules(hosturl, endpointurl, headers): Promise<any> {
    return request(hosturl)
        .get(endpointurl)
        .set(headers)
        .send();
}
export function update_PasswordRules(hosturl, endpointurl, headers, data): Promise<any> {
    return request(hosturl)
        .put(endpointurl)
        .set(headers)
        .send(data);
}
export function delete_PasswordRules(hosturl, endpointurl, headers): Promise<any> {
    return request(hosturl)
        .delete(endpointurl)
        .set(headers)
        .send();
}