import { author, contributors, requirements, tags, Tags, TestRequirements } from 'alotterysdk/dist/testDecorators';
import * as chai from 'chai';
import { assert, expect } from 'chai';
import * as request from 'supertest';
import { envSettings } from '../../../server.config';
import { RandomSource } from '../../../utils/DataUtils';
import { commonheaders } from '../../../utils/navigation';
import { departmentModelData } from '../../data/MS/MS_add_department.data';
import { departmentList, editDepartList } from "../../schema/MS/MS_add_department.schema";
import { addDepart } from '../../data/IPSurls';
import chaiHttp = require("chai-http");
chai.use(require("chai-json-schema"));

@author('Megala')
@contributors()
@tags([Tags.Fast, 'contacts', 'Security Manager'])
@requirements([TestRequirements.NavigatorApi])

export class NavigatorContactsuite { }

let Department: any = null;
let dpName: any = null;

describe('Navigator (Security Manager => Departments)', () => {

    beforeEach(() => {
        assert.property(commonheaders, 'Authorization', 'Must Conatin authoriation token');
        assert.isNotNull(commonheaders.Authorization, 'Must Conatin authoriation token');
    })

    //  describe("Creating, editing, verifying deleteing are executed below", () => {

    let keyid = null;
    //describe("The intent of the test case is to create Departments : 18670", () => {
    it('TEST ID: 18670 :: Create Department', async () => {

        //we need to get the 
        
        let departmentID = RandomSource.getRandomString(4, false, false, true);
        let departmentName = RandomSource.getRandomString(6, true, false, false);
        departmentModelData.departmentId = departmentID;
        departmentModelData.departmentName = departmentName;
        let addDepartData: any =
            await request(envSettings.serverUrl)
                .post(addDepart.Create_addDepart())
                .set(commonheaders)
                .send(departmentModelData)
                .then(res => {
                   // console.log(JSON.stringify(res));
                    assert.equal(res.status, 200, `${res.text}`);
                    return res.body;

                });
        assert.jsonSchema(addDepartData, departmentList);
        keyid = addDepartData.departmentOid;
        Department = addDepartData;
        //   console.log(keyid);
        //console.log(Department);
        //console.log(Department.employer.employerOid);                      
        //  }); 
    });
    // describe("The intent of the test case is to edit a Departments : 18672", () => {    
    it('TEST ID: 18672 :: Update Department', async () => {
        if (keyid == undefined || keyid == null) {
            pending("Not able to Edit the Department");
        }
        dpName = RandomSource.getRandomString(6, true, false, false);
        Department.departmentName = dpName;
        Department.employerOid = Department.employer.employerOid;
        Department.departmentId = departmentModelData.departmentId;
        let editDepartment: any =
            await request(envSettings.serverUrl)
                .put(addDepart.edit_addDepart(keyid))
                .set(commonheaders)
                .send(Department)
                .then(res => {
                    //console.log(JSON.stringify(res));
                    assert.equal(res.status, 200, `${res.text}`);
                    return res.body;
                });
        assert.jsonSchema(editDepartment, editDepartList);
        assert.equal(Department.departmentName, dpName, "Must have the updated information")
        //});  
    });
    //describe("The intent of the test case is to view  Departments : 18671", () => {       
    it('TEST ID: 18671 :: Verifying the created Department', async () => {
        if (keyid === null) {
            pending("Not able to proceed as failure in Department.")
        }
        let DepartData: any =
            await request(envSettings.serverUrl)
                .get(addDepart.edit_addDepart(keyid))
                .set(commonheaders)
                .send()
                .then(res => {
                    //console.log(JSON.stringify(res));
                    assert.equal(res.status, 200, `${res.text}`);
                    assert.equal(Department.departmentName, dpName, "Verified")
                    return res.body;
                });
        //});     
    });

    // describe("The intent of the test case is to remove  a department : 18673", () => { 
    it('TEST ID: 18673 :: Delete the created Department', async () => {
        if (keyid === null) {
            pending("Not able to proceed as failure in Department.")
        }
        let deleteDepartment =
            await request(envSettings.serverUrl)
                .delete(addDepart.edit_addDepart(keyid))
                .set(commonheaders)
                .send()
                .then(res => {
                    //console.log(JSON.stringify(res));
                    assert.equal(res.status, 204, `${res.text}`);
                    keyid = null;
                    return res.body;
                });
        //});
    })
    //})
});