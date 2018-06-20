//process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const {app, BrowserWindow} = require('electron')
const ProgressBar = require('electron-progressbar');
const url = require('url')
const path = require('path')
const fs = require('fs')



console.log("PATH = ")
console.log(__dirname + "/esp32/lib/release")
const pp = __dirname + "/esp32/lib/release"
const serverPath = __dirname + '/kidbrightide-macos-x64'

console.log("PATH = ")
console.log(pp + '/common.mk')
console.log("Server path = ")
console.log(serverPath)

fs.readFile(pp + '/common.mk', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    var result = data.replace(new RegExp('\\$\\(RELEASE_DIR\\)', 'g'), pp);
    fs.writeFile(pp + '/common.mk', result, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        };
    });
});


const { execFile} = require('child_process');
const child = execFile(serverPath, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    console.log("Loging !!!!");

});



app.on('ready', () => {

    var progressBar = new ProgressBar({
        indeterminate: false,
        text: 'Udating',
        detail: 'Please wait...'
    });

    progressBar
        .on('completed', function () {
            console.info(`completed...`);
            win = new BrowserWindow()
            win.loadURL(url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            }));

            win.webContents.openDevTools()
            // Emitted when the window is closed.
            win.on('closed', () => {
                // Dereference the window object, usually you would store windows
                // in an array if your app supports multi windows, this is the time
                // when you should delete the corresponding element.
                win = null
            })

            progressBar.detail = 'Task completed. Exiting...';
        })
        .on('aborted', function (value) {
            console.info(`aborted... ${value}`);
        })
        .on('progress', function (value) {
            progressBar.detail = `Value ${value} out of ${progressBar.getOptions().maxValue}...`;
        });

    // launch a task and set the value of the progress bar each time a part of the task is done;
    // the progress bar will be set as completed when it reaches its maxValue (default maxValue: 100);
    // ps: setInterval is used here just to simulate a task being done
    setInterval(function () {
        if (!progressBar.isCompleted()) {
            progressBar.value += 1;
        }
    }, 20);



    //win.loadURL('localhost:8000') 

});

app.on('before-quit', function () {
    child.kill()

});