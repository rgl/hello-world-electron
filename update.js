// handle Squirrel.Windows events.
// NB the application is installed inside %LOCALAPPDATA%.
// see https://github.com/Squirrel/Squirrel.Windows/blob/master/docs/using/custom-squirrel-events-non-cs.md
// see https://github.com/electron/windows-installer#handling-squirrel-events

function main() {
  if (process.platform !== 'win32') {
    return false;
  }

  const command = process.argv[1];

  if (!command || !command.startsWith('--squirrel-')) {
    return false;
  }

  const { app } = require('electron');
  const { spawn } = require('child_process');
  const path = require('path');
  const updateExe = path.join(path.dirname(process.execPath), '../Update.exe');
  const appExeName = path.basename(process.execPath);

  function update(args, done) {
    spawn(updateExe, args).on('close', done);
  }

  switch (command) {
    case '--squirrel-firstrun':
      return false;

    case '--squirrel-install':
      update([
        '--createShortcut', appExeName,
        '--shortcut-locations', 'StartMenu'],
        app.quit);
      return true;

    case '--squirrel-uninstall':
      update(
        ['--removeShortcut', appExeName],
        app.quit);
      return true;

    case '--squirrel-updated':
    case '--squirrel-obsolete':
    default:
      app.quit();
      return false;
  }
}

module.exports = main();
