import { promise } from "protractor";
import { OrganizationsUrls } from "../../tests/data/urls";
import { envSettings } from "../../server.config";
import { commonheaders } from "../../utils/navigation";
import { ValidOrganizationsData } from "../../tests/data/MS/MS_organization.data";
import * as request from 'supertest';

export function createOrganization(hosturl, endpointurl, headers, data): Promise<any> {
    return request(hosturl)
        .post(endpointurl)
        .set(headers)
        .send(data);
}
