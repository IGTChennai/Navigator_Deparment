/*
    ** @ Author Avinash V
    ** @ Date 10-05-2019
    ** @ Description to integrate to auror framework
*/

import * as f from 'fs';
import { Stack } from 'stack-typescript';
import { isNull } from 'util';
import * as config from './config.json';
import mongo = require('mongodb');
import * as _ from 'underscore';

class AuroraReporter implements jasmine.CustomReporter, jasmine.Reporter {
    output: object = new Object();
    current_suite: string = null;
    suites: Stack<string> = new Stack();

    reportRunnerStarting(runner: jasmine.Runner): void {
        // console.log("Report runner startting")
    }

    reportRunnerResults(runner: jasmine.Runner): void {
        // console.log("Report runner results")
    }

    reportSuiteResults(suite: jasmine.Suite): void {

    }

    reportSpecStarting(spec: jasmine.Spec): void {

    }

    reportSpecResults(spec: jasmine.Spec): void {

    }

    log(str: string): void {

    }

    
    jasmineStarted?(suiteInfo: jasmine.SuiteInfo): void {
        this.output['Run'] = (suiteInfo);
        this.output['Run']['start time'] = new Date();
    }

    async jasmineDone?(runDetails: jasmine.RunDetails) {
        let duration: any = new Date();
        duration = duration - this.output['Run']['start time'];

        this.output['Run']['failedExpectations'] = runDetails['failedExpectations'];
        this.output['Run']['deprecationWarnings'] = runDetails['deprecationWarnings'];
        this.output['Run']['overallStatus'] = runDetails['overallStatus'];
        this.output['Run']['duration'] = duration;

        f.writeFileSync('a.json', JSON.stringify(this.output));
        await this.saveReport();
    }

    async saveReport() {
        console.log(`called save ${config.mongodburl} \t ${config.dbname}`);

        const client = await mongo.MongoClient.connect(config.mongodburl, { useNewUrlParser: true }).
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
        const res = await collection.insertOne({
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
    }

    suiteStarted?(result: jasmine.CustomReporterResult): void {

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

    suiteDone?(result: jasmine.CustomReporterResult): void {
        result.id = this.suites.top;
        let duration: any = new Date();
        duration = duration - this.output[result.id]['Start time'];
        let parent: string = null;
        let specs: any = null;

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
        } else {
            this.output[result.id] = (result);
        }

        if (suites !== null) {
            this.output[result.id].suites = suites;
        }

        if (!isNull(parent)) {
            this.output[result.id]['parent'] = parent;
        }

        if (!isNull(specs)) {
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

    specStarted?(result: jasmine.CustomReporterResult): void {

        if (!('specs' in this.output[this.suites.top])) {
            this.output[this.suites.top]['specs'] = [];
        }

        result['Start time'] = new Date();
        this.output[this.suites.top]['specs'].push(result);
    }

    specDone?(result: jasmine.CustomReporterResult): void {

        const prevspec: any = this.output[this.suites.top]['specs'].pop();

        let duration: any = new Date();
        duration = duration - prevspec['Start time'];

        result['duration'] = duration;
        this.output[this.suites.top]['specs'].push(result);
        if (result.status === 'failed') {
            this.output[this.suites.top]['status'] = 'failed';
        }
    }

    getsuitesstats(): number {
        const stats: any = {};

        for (const key in this.output) {
            if (key.startsWith('suite')) {
                this.getsuitestats(stats, this.output[key]);
            }
        }
        return stats;
    }

    getsuitestats(stats: any, suite: any): void {
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

    getspecstats(): number {
       // console.log(this.output);
        const stats: any = {};

        for (const key in this.output) {
            if (key.startsWith('suite')) {
                this.getspecstat(stats, this.output[key]);
            }
        }
       // console.log(stats);
        return stats;
    }

    getspecstat(stats: any, suite: any): void {
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

export default AuroraReporter;
