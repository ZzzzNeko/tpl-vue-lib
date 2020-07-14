const commander = require("commander");
const { spawn } = require("child_process");
const path = require("path");
const configPath = path.resolve(__dirname, "../config/serve.app.js");

commander
  .command("serve")
  .description("启动开发环境")
  .action(function(command) {
    const script = `webpack-dev-server --config ${configPath}`;
    spawn(script, { shell: true, stdio: "inherit" });
  });

commander.parse(process.argv);
