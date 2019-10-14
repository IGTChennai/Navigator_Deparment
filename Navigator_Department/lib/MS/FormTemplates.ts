import * as request from 'supertest';

export function create_FormTemplates(hosturl, endpointurl, headers, data): Promise<any> {
    return request(hosturl)
        .post(endpointurl)
        .set(headers)
        .send(data);
}
export function update_FormTemplates(hosturl, endpointurl, headers, data): Promise<any> {
    return request(hosturl)
        .put(endpointurl)
        .set(headers)
        .send(data);
}
export function read_FormTemplates(hosturl, endpointurl, headers): Promise<any> {
    return request(hosturl)
        .get(endpointurl)
        .set(headers)
        .send();
}
export function delete_FormTemplates(hosturl, endpointurl, headers): Promise<any> {
    return request(hosturl)
        .delete(endpointurl)
        .set(headers)
        .send();
}