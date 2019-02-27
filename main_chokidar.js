var fs = require("fs");
var path = require("path");
var chokidar = require('chokidar');

var appFileName = 'app.json';
var appObjectFolderName = 'objects';
var appSrcDirectory = path.join(__dirname, "src");
var appFilePath = path.join(appSrcDirectory, appFileName);
var appObjectFolderPath = path.join(appSrcDirectory, appObjectFolderName)

var loadJSONFile = function(filePath){
    return JSON.parse(fs.readFileSync(filePath, 'utf8').normalize('NFC'));
}

var loadAppFromJSON = function(){
    if(fs.existsSync(appFilePath)){
        var app = loadJSONFile(appFilePath);
        Creator.Apps[app.name] = app;
    }
}

var unloadApp = function(path){

}

var loadObjectFromJSON = function(objectFilePath){
    if(fs.existsSync(objectFilePath)){
        var appObj = loadJSONFile(objectFilePath)
        Creator.Objects[appObj.name] = appObj
        Creator.loadObjects(appObj)
    }
}

var reload = function(path){
    if(path == appFilePath){
        loadAppFromJSON()
    }else if(path.startsWith(appObjectFolderPath)){
        loadObjectFromJSON(path)
    }
}

var unload = function(path){
    if(path == appFilePath){
        loadAppFromJSON()
    }else if(path.startsWith(appObjectFolderPath)){
        loadObjectFromJSON(path)
    }
}

if(fs.statSync(appSrcDirectory).isDirectory()){
    // fs.readdir(appSrcDirectory, function(err, appFiles){
    //     var appFilePath = path.join(appSrcDirectory, appFileName)
    //     if(fs.existsSync(appFilePath)){
    //         var app = JSON.parse(fs.readFileSync(appFilePath, 'utf8').normalize('NFC'))
    //         Creator.Apps[app.name] = app

    //         fs.watchFile(appFilePath, (curr, prev) => {
    //             var app = JSON.parse(fs.readFileSync(appFilePath, 'utf8').normalize('NFC'))
    //             Creator.Apps[app.name] = app
    //         });
    //     }
    //     var appObjectFolderPath = path.join(appSrcDirectory, appObjectFolderName)
    //     if(fs.existsSync(appObjectFolderPath)){
    //         fs.readdir(appObjectFolderPath, function(err, appObjectFiles){
    //             _.each(appObjectFiles, function(aof){
    //                 var objectPath = path.join(appObjectFolderPath, aof)
    //                 var appObj = JSON.parse(fs.readFileSync(objectPath, 'utf8').normalize('NFC'))
    //                 Creator.Objects[appObj.name] = appObj
    //                 Creator.loadObjects(appObj)
    //                 fs.watchFile(objectPath, (curr, prev) => {
    //                     var appObj = JSON.parse(fs.readFileSync(objectPath, 'utf8').normalize('NFC'))
    //                     Creator.Objects[appObj.name] = appObj
    //                     Creator.fiberLoadObjects(appObj)
    //                 });
    //             })
    //         })
    //     }
    // })

    var watcher = chokidar.watch(appSrcDirectory, {
        ignored: /(^|[\/\\])\../,
        persistent: true
      });

    // Something to use when events are received.
    var log = console.log.bind(console);
    // Add event listeners.
    watcher
    .on('add', (path, stats) => {
        console.log('add', path, stats)
    })
    .on('change', (path, stats) => console.log('change', path, stats))
    .on('unlink', (path, stats) => {
        console.log('unlink', path, stats)
        if(fs.existsSync(path)){
            var app = loadJSONFile(path);
            console.log('unlink', app);
        }
    });

}