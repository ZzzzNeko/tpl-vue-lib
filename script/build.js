const path = require("path");
const commander = require("commander");
const listr = require("listr");
const execa = require("execa");
const fse = require("fs-extra");
const libCfgPath = path.resolve(__dirname, "../config/build.lib.js");
const appCfgPath = path.resolve(__dirname, "../config/build.app.js");

commander
  .command("build")
  .arguments("[target]")
  .action(async function(target, command) {
    const libScript = `webpack --config ${libCfgPath}`;
    const appScript = `webpack --config ${appCfgPath}`;
    if (target === "lib") {
      await fse.remove(path.resolve(__dirname, "../types/lib"));
      execa(libScript, { shell: true, stdio: "inherit" });
    } else if (target === "app") {
      await fse.remove(path.resolve(__dirname, "../types/app"));
      execa(appScript, { shell: true, stdio: "inherit" });
    } else {
      // build lib & app
      const tasks = new listr([
        {
          title: "clear types/lib dir",
          task: () => fse.remove(path.resolve(__dirname, "../types/lib")),
        },
        {
          title: "build lib",
          task: () => execa(libScript, { shell: true, stdio: "inherit" }),
        },
        {
          title: "clear types/app dir",
          task: () => fse.remove(path.resolve(__dirname, "../types/app")),
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
