import { Server } from "https";
import { envSettings } from "../../server.config";
import { runInThisContext } from "vm";

export const repUrls = {
    auth: {
        login: "api/v1/authtoken",
        logout: "api/v1/authtoken/current"
    },

    base: "api/v1/representatives",
    get credentialsCheck() { return `${this.base}/credentials-check` },
    delete: function (id) { return `${this.base}/${id}` },
    modify: function (id) { return `${this.base}/${id}` },
    getById: function (id) { return `${this.base}/${id}` },

}

export class urls {
    protected static appbase: string = "api/v1/";

}
// export class DepartmentUrls extends urls {
//     private static Base: string = "departments/"

//     static Single_department(oid: number): string {
//         return this.appbase.concat(this.Base, oid.toString());
//     }

//     static Create_department(): string {
//         return this.appbase.concat(this.Base);
//     }
// }

export class GroupUrls extends urls {
    private static createGroup: string = "groups/"

    static Create_Group(): string {
        return this.appbase.concat(this.createGroup);
    }

    static Single_Group(groupOid: number): string {
        return this.appbase.concat(`${this.createGroup}${groupOid}`)
    }

    static CopyGroupData(groupOid: number): string {
        return this.appbase.concat(`${this.createGroup}${groupOid}?for-copy=true`)
    }

}
export class PasswordRuleUrls extends urls {
    private static CreatePasswordRules: string = "rules/"

    static Create_PasswordRules(): string {
        return this.appbase.concat(this.CreatePasswordRules);

    }
    static single_PasswordRules(paramOid: number): string {
        return this.appbase.concat(`${this.CreatePasswordRules}${paramOid}`)
    }
}
export class GTMSTime extends urls {

    static getGTMSTime(): string {
        return this.appbase.concat(`este/systems/primary`)
    }


}