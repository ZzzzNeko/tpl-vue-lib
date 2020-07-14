const path = require("path");
const commander = require("commander");
const listr = require("listr");
const execa = require("execa");
const libCfgPath = path.resolve(__dirname, "../config/build.lib.js");
const appCfgPath = path.resolve(__dirname, "../config/build.app.js");

commander
  .command("build")
  .arguments("[target]")
  .action(function(target, command) {
    const libScript = `webpack --config ${libCfgPath}`;
    const appScript = `webpack --config ${appCfgPath}`;
    if (target === "lib") {
      execa(libScript, { shell: true, stdio: "inherit" });
    } else if (target === "app") {
      execa(appScript, { shell: true, stdio: "inherit" });
    } else {
      // build lib & app
      const tasks = new listr([
        {
          title: "build lib",
          task: () => execa(libScript, { shell: true, stdio: "inherit" }),
        },
        {
          title: "build app",
          task: () => execa(appScript, { shell: true, stdio: "inherit" }),
        },
      ]);
      tasks.run().catch((error) => console.log(error));
    }
  });

commander.parse(process.argv);
