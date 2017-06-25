/*https://github.com/electron/windows-installer*/
var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
	title: "Geogig_Desktop",
    name : 'Geogig_Desktop',
    authors: 'jlanio',
    appDirectory: './Geogig-Desktop-win32-x64',
    outputDirectory: './release',
    exe: 'Geogig-Desktop.exe',
    loadingGif : '',
    setupIcon : './app/static/favicon.ico',
    noMsi: true,
    setupExe: 'Geogig-Desktop.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));