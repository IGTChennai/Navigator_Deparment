import jasmine = require('jasmine');
import jtag = require('./Spectagger');
import * as csv from 'csvtojson';
import * as _ from 'underscore';
import * as JasmineConsoleReporter from 'jasmine-console-reporter';
import AuroraReporter from './Custom-Reporter';
import  {envSettings} from './server.config';
import { exists } from 'fs';

for (const iterator of process.argv) {
    if(iterator.startsWith("http://") || iterator.startsWith("https://"))
    {
        envSettings.serverUrl = iterator;
    }
}

function execute() {
    const jas: jasmine = new jasmine([]);
    jas.loadConfigFile('spec/support/jasmine.json');
    jtag(jas);
    (jas as any).setIncludedTags([
        ['Navigator', 'Read'],
        ['Navigator', 'Create'],
        ['Navigator', 'Update'],
        ['Navigator', 'Delete'],
        ['Navigator', 'Copy']
    ]);
    jas.configureDefaultReporter({
        showColors: true,
    });
    jas.addReporter(new JasmineConsoleReporter({
        colors: 1,           // (0|false)|(1|true)|2
        cleanStack: 1,       // (0|false)|(1|true)|2|3
        verbosity: 4,        // (0|false)|1|2|(3|true)|4|Object
        listStyle: 'indent', // "flat"|"indent"
        timeUnit: 'ms',      // "ms"|"ns"|"s"
        timeThreshold: { ok: 500, warn: 1000, ouch: 3000 }, // Object|Number
        activity: false,     // boolean or string ("dots"|"star"|"flip"|"bouncingBar"|...)
        emoji: true,
        beep: true,
    }));
    jas.addReporter(new AuroraReporter());
    jas.execute();
}


csv().fromFile('config/testdesc.csv').on('error', (err) => {
    console.log(err);
}).then((data: any) => {
    (global as any).testmetadata = _.flatten(data);
    (global as any).getname = (id: string, envname: string, withdesc: boolean = false) => {
        let temp = _.where((global as any).testmetadata, { ID: id.toString() });
        return withdesc ? temp[0][envname].toString().concat('  =>  ', temp[0]['short description']) : temp[0][envname];
    };
    execute();
});