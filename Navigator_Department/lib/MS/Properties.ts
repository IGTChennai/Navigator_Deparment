import * as request from 'supertest';

export function create_Properties(hosturl, endpointurl, headers, data): Promise<any> {
    return request(hosturl)
        .post(endpointurl)
        .set(headers)
        .send(data);
}
export function read_Properties(hosturl, endpointurl, headers): Promise<any> {
    return request(hosturl)
        .get(endpointurl)
        .set(headers)
        .send();
}
export function update_Properties(hosturl, endpointurl, headers, data): Promise<any> {
    return request(hosturl)
        .put(endpointurl)
        .set(headers)
        .send(data);
}
export function delete_Properties(hosturl, endpointurl, headers): Promise<any> {
    return request(hosturl)
        .delete(endpointurl)
        .set(headers)
        .send();
}