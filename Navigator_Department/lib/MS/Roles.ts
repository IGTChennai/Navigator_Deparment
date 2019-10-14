import * as request from 'supertest';

export function create_Roles(hosturl, endpointurl, headers, data): Promise<any> {
    return request(hosturl)
        .post(endpointurl)
        .set(headers)
        .send(data);
}
export function read_Roles(hosturl, endpointurl, headers): Promise<any> {
    return request(hosturl)
        .get(endpointurl)
        .set(headers)
        .send();
}
export function update_Roles(hosturl, endpointurl, headers, data): Promise<any> {
    return request(hosturl)
        .put(endpointurl)
        .set(headers)
        .send(data);
}
export function delete_Roles(hosturl, endpointurl, headers): Promise<any> {
    return request(hosturl)
        .delete(endpointurl)
        .set(headers)
        .send();
}