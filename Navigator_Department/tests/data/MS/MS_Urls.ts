
export class urls {
    protected static appcontext: string = "api/v1/";
}

export class TokenPoliciesUrls extends urls {
    private static CreateTokenPolicies: string = "authtoken/policies/"

    static Create_TokenPolicies(): string {
        return this.appcontext.concat(this.CreateTokenPolicies);
    }
    static Read_TokenPolicies(authTokenPolicyOid: number): string {
        return this.appcontext.concat(`${this.CreateTokenPolicies}${authTokenPolicyOid}`)
    }
    static Update_TokenPolicies(authTokenPolicyOid: number): string {
        return this.appcontext.concat(`${this.CreateTokenPolicies}${authTokenPolicyOid}`)
    }
    static Delete_TokenPolicies(authTokenPolicyOid: number): string {
        return this.appcontext.concat(`${this.CreateTokenPolicies}${authTokenPolicyOid}`)
    }

}
export class PasswordUrls extends urls {
    private static CreatePassword: string = "password/policies/"

    static Create_PasswordPolicies(): string {
        return this.appcontext.concat(this.CreatePassword);

    }
    static single_PasswordPolicies(passwordPolicyOid: number): string {
        return this.appcontext.concat(`${this.CreatePassword}${passwordPolicyOid}`)
    }
}
export class OrganizationsUrls extends urls {
    private static OrgBase: string = "employers/"

    static Single_organization(oid: number): string {
        return this.appcontext.concat(this.OrgBase, oid.toString());
    }

    static Create_organization(): string {
        return this.appcontext.concat(this.OrgBase);
    }
}
export class addOffice extends urls {
    private static addOfficebase: string = "offices";

    static Create_addOffice(): string {
        return this.appcontext.concat(`${this.addOfficebase}`);
    }
    static edit_addOffice(keyid: string): string {
        return this.appcontext.concat(`offices/${keyid}`);
    }
}
export class addDepart extends urls {
    private static addDepartbase: string = "departments";

    static Create_addDepart(): string {
        return this.appcontext.concat(`${this.addDepartbase}`);
    }
    static edit_addDepart(keyid: number): string {
        return this.appcontext.concat(`departments/${keyid}`);
    }

}
export class addUser extends urls {
    private static addUserbase: string = "users";

    static Create_addUser(): string {
        return this.appcontext.concat(`${this.addUserbase}`);
    }
    static search_addUser(name: string): string {
        return this.appcontext.concat(`users?first-name=${name}`);
    }
    static edit_addUser(keyid: number): string {
        return this.appcontext.concat(`users/${keyid}`);
    }
    static copy_User(id: number): string {
        return this.appcontext.concat(`users/${id}?for-copy=true`);
    }

}
export class addTypecode extends urls {
    private static addTypecodepbase: string = "typecodes";

    static Create_addTypecode(): string {
        return this.appcontext.concat(`${this.addTypecodepbase}`);
    }
    static edit_addTypecode(keyid: string): string {
        return this.appcontext.concat(`${this.addTypecodepbase}/${keyid}`);
    }

}
export class securityEvents extends urls {
    static Create_securityEvents(): string {
        return this.appcontext.concat(`security-events?ascending=false&page-number=0&page-size=10&sort-property=creationDatetime`);
    }
    static Verify_securityEvents(keyname: string): string {
        return this.appcontext.concat(`security-events?ascending=false&creator-id=${keyname}&page-number=0&page-size=10&sort-property=creationDatetime`);
    }
    static advanced_securityEvents(keyname: string, keyEvent: number): string {
        return this.appcontext.concat(`security-events?ascending=false&creator-id=${keyname}&event-type=${keyEvent}&page-number=0&page-size=10&sort-property=creationDatetime`);
    }
}
export class addRoles extends urls {
    private static addRolesbase: string = "roles";

    static Create_addRoles(): string {
        return this.appcontext.concat(`${this.addRolesbase}`);
    }
    static edit_info(roleid: number): string {
        return this.appcontext.concat(`${this.addRolesbase}/${roleid}`);
    }
    // static role_info(roleid:number): string {
    //     return this.appbase.concat(`roles?role-name-or-id=${roleid}`);
    // }
}
export class addRep extends urls {
    private static addrepbase: string = "representatives";

    static Create_addRep(): string {
        return this.appcontext.concat(`${this.addrepbase}`);
    }
    static edit_addRep(repid: number): string {
        return this.appcontext.concat(`${this.addrepbase}/${repid}`);
    }
}
export class addForm extends urls {
    private static addrepbase: string = "form-templates";

    static Create_addForm(): string {
        return this.appcontext.concat(`${this.addrepbase}`);
    }
    static edit_addForm(keyid: string): string {
        return this.appcontext.concat(`${this.addrepbase}/${keyid}`);
    }
}
export class addProp extends urls {
    private static addrepbase: string = "properties";

    static Create_properties(): string {
        return this.appcontext.concat(`${this.addrepbase}`);
    }
    static edit_properties(keyid: string): string {
        return this.appcontext.concat(`${this.addrepbase}/${keyid}`);
    }
}
export class addFormTemplate extends urls {
    private static addFormTemplatebase: string = "form-templates";

    static Create_addFormTemplate(): string {
        return this.appcontext.concat(`${this.addFormTemplatebase}`);
    }
    static edit_addFormTemplate(keyid: number): string {
        return this.appcontext.concat(`form-templates/${keyid}`);
    }
    static search_addFormTemplate(keyname: string): string {
        return this.appcontext.concat(`form-templates?name=${keyname}`);
    }
    static copy_FormTemplate(id: string): string {
        return this.appcontext.concat(`form-templates/${id}?for-copy=true`);
    }

}
export class ContactUrls extends urls {
    private static contactbase: string = "contacts/";

    static Single_Contact(oid: number): string {
        return this.appcontext.concat(this.contactbase, oid.toString());
    }
    static Create_contact(): string {
        return this.appcontext.concat(this.contactbase);
    }
}
export class GroupUrls extends urls {
    private static createGroup: string = "groups/"

    static Create_Group(): string {
        return this.appcontext.concat(this.createGroup);
    }

    static Single_Group(groupOid: number): string {
        return this.appcontext.concat(`${this.createGroup}${groupOid}`)
    }
    static CopyGroupData(groupOid: number): string {
        return this.appcontext.concat(`${this.createGroup}${groupOid}?for-copy=true`)
    }

}