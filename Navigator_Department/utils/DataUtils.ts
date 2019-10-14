import * as chai from 'chai';
import * as request from 'supertest';
import { envSettings } from '../server.config';
import { commonheaders } from './auth';
//import { orderStatusData } from '../tests/data/IPS/IPS_OrderDetails.data';
//import { OwnersBasicSearch, CreateLocationsAdjustments } from '../tests/data/RMT/RMT_Urls';
chai.use(require("chai-json-schema"));

export class RandomSource {

    static getRandomString(length: number, alphabets: boolean, symbolsallowed: boolean, numbersallowed: boolean): string {
        let nums: string = "0123456789";
        let alphas: string = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        let symbols: string = '~!@#$%^&*()<>?:{};\'[]/.,';

        let characters: string = '';

        let randomstring: string = '';

        if (alphabets == true) {
            characters = characters.concat(alphas);
        }
        if (symbolsallowed == true) {
            characters = characters.concat(symbols);
        }
        if (numbersallowed == true) {
            characters = characters.concat(nums);
        }
        for (var i = 0; i < length; i++) {
            var rnum = Math.floor(Math.random() * characters.length);
            randomstring = randomstring.concat(characters.substring(rnum, rnum + 1));
        }

        return randomstring;
    }
    static getRandomNumber(length: number, numbersallowed: boolean) {
        let nums: string = "0123456789";
        let numbers: string = '';
        let randomnumber: string = '';

        if (numbersallowed == true) {
            numbers = numbers.concat(nums);
        }
        for (var i = 0; i < length; i++) {
            var rnum = Math.floor((Math.random() * numbers.length));
            //console.log('kjdskjkjds = ' + rnum);
            randomnumber = randomnumber.concat(numbers.substring(rnum, rnum + 1));
        }
        return randomnumber;
    }
    // static getOrderStatusCode(status: any): number {
    //     for (var i = 0; i <= orderStatusData.length; i++) {
    //         if (orderStatusData[i].StatusName == status) {
    //             status = orderStatusData[i].StatusId
    //             break;
    //         }
    //     }
    //     return status;
    // }
    static getProductId(productArray: any, selectedProduct: any): number {
        for (var i = 0; i <= productArray.length; i++) {
            if (productArray[i].name == selectedProduct) {
                selectedProduct = productArray[i].id;
                break;
            }
        }
        return selectedProduct;
    }
    // static async getRetailerIdOrRetailerOid() {
    //     return await request(envSettings.serverUrl)
    //         .get(CreateLocationsAdjustments.Search_DefaultLocationInfo())
    //         .set(commonheaders)
    //         .send();
    // }
    // static getBillToRetailerId(): number {
    //     let retailerOid: number = 100104;
    //     return retailerOid;
    // }
    // static async getRetailerOwnerId() { 
    //     return await request(envSettings.serverUrl)
    //         .get(OwnersBasicSearch.Search_Owners())
    //         .set(commonheaders)
    //         .send();
    // }
}