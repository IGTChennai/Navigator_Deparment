"use strict";
/*
    ** @ Author Avinash V
    ** @ Date 10-05-2019
    ** @ Description to integrate to auror framework
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const f = require("fs");
const stack_typescript_1 = require("stack-typescript");
const util_1 = require("util");
const config = require("./config.json");
const mongo = require("mongodb");
class AuroraReporter {
    constructor() {
        this.output = new Object();
        this.current_suite = null;
        this.suites = new stack_typescript_1.Stack();
    }
    reportRunnerStarting(runner) {
        // console.log("Report runner startting")
    }
    reportRunnerResults(runner) {
        // console.log("Report runner results")
    }
    reportSuiteResults(suite) {
    }
    reportSpecStarting(spec) {
    }
    reportSpecResults(spec) {
    }
    log(str) {
    }
    jasmineStarted(suiteInfo) {
        this.output['Run'] = (suiteInfo);
        this.output['Run']['start time'] = new Date();
    }
    jasmineDone(runDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            let duration = new Date();
            duration = duration - this.output['Run']['start time'];
            this.output['Run']['failedExpectations'] = runDetails['failedExpectations'];
            this.output['Run']['deprecationWarnings'] = runDetails['deprecationWarnings'];
            this.output['Run']['overallStatus'] = runDetails['overallStatus'];
            this.output['Run']['duration'] = duration;
            f.writeFileSync('a.json', JSON.stringify(this.output));
            yield this.saveReport();
        });
    }
    saveReport() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`called save ${config.mongodburl} \t ${config.dbname}`);
            const client = yield mongo.MongoClient.connect(config.mongodburl, { useNewUrlParser: true }).
                then((result) => {
                return result;
            }).catch(() => {
                console.log('Not able to connect');
                return null;
            });
            if (client === null) {
                console.log('Not able to conneted to mongo db');
                return;
            }
            const db = client.db(config.dbname);
            db.createCollection(config.projectname);
            const id = new Date();
            const collection = db.collection(config.collection);
            const res = yield collection.insertOne({
                '_id': id,
                'initiatedby': config.initiatedby,
                'reason': config.reason,
                'stats': {
                    suite: this.getsuitesstats(),
                    cases: this.getspecstats(),
                },
                'outcome status': this.output['Run']['overallStatus'],
                'outcome data': this.output
            })
                .then((result) => {
                console.log(result.insertedId);
                return result;
            }).catch((err) => {
                console.log('error in inserting record');
            });
            client.close();
            console.log('end of the save method');
        });
    }
    suiteStarted(result) {
        while (result.id in this.output) {
            result.id = `suite${new Date().getMilliseconds().toString()}`;
        }
        this.output[result.id] = result;
        this.output[result.id]['Start time'] = new Date();
        if (this.suites.size > 0) {
            this.output[result.id]['parent'] = this.suites.top;
        }
        this.suites.push(result.id);
    }
    suiteDone(result) {
        result.id = this.suites.top;
        let duration = new Date();
        duration = duration - this.output[result.id]['Start time'];
        let parent = null;
        let specs = null;
        if ('parent' in this.output[result.id]) {
            parent = this.output[result.id]['parent'];
        }
        if ('specs' in this.output[result.id]) {
            specs = this.output[result.id]['specs'];
        }
        let suites = null;
        if ('suites' in this.output[result.id]) {
            suites = this.output[result.id]['suites'];
        }
        if (this.output[result.id].status === 'failed') {
            this.output[result.id] = (result);
            this.output[result.id].status = 'failed';
        }
        else {
            this.output[result.id] = (result);
        }
        if (suites !== null) {
            this.output[result.id].suites = suites;
        }
        if (!util_1.isNull(parent)) {
            this.output[result.id]['parent'] = parent;
        }
        if (!util_1.isNull(specs)) {
            this.output[result.id]['specs'] = specs;
        }
        this.output[result.id]['duration'] = duration;
        if (parent !== null) {
            if (!('suites' in this.output[parent])) {
                this.output[parent].suites = [];
            }
            this.output[parent].suites.push(this.output[result.id]);
            if (this.output[result.id].status === 'failed') {
                this.output[parent].status = 'failed';
            }
            delete this.output[result.id];
        }
        this.suites.pop();
    }
    specStarted(result) {
        if (!('specs' in this.output[this.suites.top])) {
            this.output[this.suites.top]['specs'] = [];
        }
        result['Start time'] = new Date();
        this.output[this.suites.top]['specs'].push(result);
    }
    specDone(result) {
        const prevspec = this.output[this.suites.top]['specs'].pop();
        let duration = new Date();
        duration = duration - prevspec['Start time'];
        result['duration'] = duration;
        this.output[this.suites.top]['specs'].push(result);
        if (result.status === 'failed') {
            this.output[this.suites.top]['status'] = 'failed';
        }
    }
    getsuitesstats() {
        const stats = {};
        for (const key in this.output) {
            if (key.startsWith('suite')) {
                this.getsuitestats(stats, this.output[key]);
            }
        }
        return stats;
    }
    getsuitestats(stats, suite) {
        if (!(suite['status'] in stats)) {
            stats[suite['status']] = 0;
        }
        stats[suite['status']]++;
        if ('suites' in suite) {
            for (const iterator of suite['suites']) {
                this.getsuitestats(stats, iterator);
            }
        }
    }
    getspecstats() {
        // console.log(this.output);
        const stats = {};
        for (const key in this.output) {
            if (key.startsWith('suite')) {
                this.getspecstat(stats, this.output[key]);
            }
        }
        // console.log(stats);
        return stats;
    }
    getspecstat(stats, suite) {
        if ('specs' in suite) {
            for (const iterator of suite['specs']) {
                if (!(iterator['status'] in stats)) {
                    stats[iterator['status']] = 0;
                }
                stats[iterator['status']]++;
            }
        }
        if ('suites' in suite) {
            for (const iterator of suite['suites']) {
                this.getspecstat(stats, iterator);
            }
        }
    }
}
exports.default = AuroraReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tLVJlcG9ydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vQ3VzdG9tLVJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztFQUlFOzs7Ozs7Ozs7O0FBRUYsd0JBQXdCO0FBQ3hCLHVEQUF5QztBQUN6QywrQkFBOEI7QUFDOUIsd0NBQXdDO0FBQ3hDLGlDQUFrQztBQUdsQyxNQUFNLGNBQWM7SUFBcEI7UUFDSSxXQUFNLEdBQVcsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUM5QixrQkFBYSxHQUFXLElBQUksQ0FBQztRQUM3QixXQUFNLEdBQWtCLElBQUksd0JBQUssRUFBRSxDQUFDO0lBNE94QyxDQUFDO0lBMU9HLG9CQUFvQixDQUFDLE1BQXNCO1FBQ3ZDLHlDQUF5QztJQUM3QyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsTUFBc0I7UUFDdEMsdUNBQXVDO0lBQzNDLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxLQUFvQjtJQUV2QyxDQUFDO0lBRUQsa0JBQWtCLENBQUMsSUFBa0I7SUFFckMsQ0FBQztJQUVELGlCQUFpQixDQUFDLElBQWtCO0lBRXBDLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBVztJQUVmLENBQUM7SUFHRCxjQUFjLENBQUUsU0FBNEI7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUssV0FBVyxDQUFFLFVBQThCOztZQUM3QyxJQUFJLFFBQVEsR0FBUSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQy9CLFFBQVEsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUV2RCxJQUFJLENBQUMsTUFBTSxDQUFDLEtB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