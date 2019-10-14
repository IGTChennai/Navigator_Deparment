"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine = require("jasmine");
const jtag = require("./Spectagger");
const csv = require("csvtojson");
const _ = require("underscore");
const JasmineConsoleReporter = require("jasmine-console-reporter");
const Custom_Reporter_1 = require("./Custom-Reporter");
const server_config_1 = require("./server.config");
for (const iterator of process.argv) {
    if (iterator.startsWith("http://") || iterator.startsWith("https://")) {
        server_config_1.envSettings.serverUrl = iterator;
    }
}
function execute() {
    const jas = new jasmine([]);
    jas.loadConfigFile('spec/support/jasmine.json');
    jtag(jas);
    jas.setIncludedTags([
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
        colors: 1,
        cleanStack: 1,
        verbosity: 4,
        listStyle: 'indent',
        timeUnit: 'ms',
        timeThreshold: { ok: 500, warn: 1000, ouch: 3000 },
        activity: false,
        emoji: true,
        beep: true,
    }));
    jas.addReporter(new Custom_Reporter_1.default());
    jas.execute();
}
csv().fromFile('config/testdesc.csv').on('error', (err) => {
    console.log(err);
}).then((data) => {
    global.testmetadata = _.flatten(data);
    global.getname = (id, envname, withdesc = false) => {
        let temp = _.where(global.testmetadata, { ID: id.toString() });
        return withdesc ? temp[0][envname].toString().concat('  =>  ', temp[0]['short description']) : temp[0][envname];
    };
    execute();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamFzbWluZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9qYXNtaW5lLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFvQztBQUNwQyxxQ0FBc0M7QUFDdEMsaUNBQWlDO0FBQ2pDLGdDQUFnQztBQUNoQyxtRUFBbUU7QUFDbkUsdURBQStDO0FBQy9DLG1EQUE2QztBQUc3QyxLQUFLLE1BQU0sUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7SUFDakMsSUFBRyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQ3BFO1FBQ0ksMkJBQVcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0tBQ3BDO0NBQ0o7QUFFRCxTQUFTLE9BQU87SUFDWixNQUFNLEdBQUcsR0FBWSxJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxHQUFHLENBQUMsY0FBYyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1QsR0FBVyxDQUFDLGVBQWUsQ0FBQztRQUN6QixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7UUFDckIsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDO1FBQ3ZCLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztRQUN2QixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUM7UUFDdkIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDO0tBQ3hCLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQztRQUN6QixVQUFVLEVBQUUsSUFBSTtLQUNuQixDQUFDLENBQUM7SUFDSCxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksc0JBQXNCLENBQUM7UUFDdkMsTUFBTSxFQUFFLENBQUM7UUFDVCxVQUFVLEVBQUUsQ0FBQztRQUNiLFNBQVMsRUFBRSxDQUFDO1FBQ1osU0FBUyxFQUFFLFFBQVE7UUFDbkIsUUFBUSxFQUFFLElBQUk7UUFDZCxhQUFhLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtRQUNsRCxRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLElBQUk7S0FDYixDQUFDLENBQUMsQ0FBQztJQUNKLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSx5QkFBYyxFQUFFLENBQUMsQ0FBQztJQUN0QyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDbEIsQ0FBQztBQUdELEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO0lBQ2pCLE1BQWMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxNQUFjLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBVSxFQUFFLE9BQWUsRUFBRSxXQUFvQixLQUFLLEVBQUUsRUFBRTtRQUNqRixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFFLE1BQWMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4RSxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BILENBQUMsQ0FBQztJQUNGLE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFDLENBQUMifQ==