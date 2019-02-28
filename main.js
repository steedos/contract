const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');

const appFileName = 'app.json';
const objectFolderName = 'objects';
const triggerFolderName = 'triggers';
const actionFolderName = 'actions';
const srcDirectory = path.join(__dirname, "src");

let loadObjectsMapping = {}

const loadJSONFile = (filePath)=>{
    return JSON.parse(fs.readFileSync(filePath, 'utf8').normalize('NFC'));
}

const loadYmlFile = (filePath)=>{
    return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
}

const loadJSFile = (filePath)=>{
    return require(filePath);
}

const loadFile = (filePath)=>{
    console.info('loadFile', filePath);
    try {
        let extname = path.extname(filePath);
        if(extname.toLocaleLowerCase() == '.json')
            return loadJSONFile(filePath);
        else if(extname.toLocaleLowerCase() == '.yml')
            return loadYmlFile(filePath);
    } catch (error) {
        console.error('loadFile error', filePath, error);
        return {}
    }
}

const loadApp = (appFilePath)=>{
    let app = loadFile(appFilePath);
    if(!_.isEmpty(app)){
        Creator.Apps[app.name] = app;
    }
}

const loadObjectInCreator = (object)=>{
    if(!_.isEmpty(object)){
        Creator.Objects[object.name] = object;
        Creator.fiberLoadObjects(object);
    }
}

const loadObject = (objectPath)=>{
    let obj =loadFile(objectPath);
    loadObjectInCreator(obj)
}

//TODO afterUndelete，beforeSubmit
const triggerMapping = {
    beforeInsert: {
        on: 'server',
        when: 'before.insert'
    },
    beforeUpdate: {
        on: 'server',
        when: 'before.update'
    },
    beforeDelete: {
        on: 'server',
        when: 'before.remove'
    },
    afterInsert: {
        on: 'server',
        when: 'after.insert'
    },
    afterUpdate: {
        on: 'server',
        when: 'after.update'
    },
    afterDelete: {
        on: 'server',
        when: 'after.remove'
    }
} 
const loadTrigger = (triggerPath)=>{
    let trigger = loadJSFile(triggerPath);
    let object_name = trigger.object_name
    if(!object_name){
        console.error(`load trigger error：Missing attribute 'object_name' /r ${triggerPath}`)
        return
    }

    let object = Creator.Objects[object_name]
    if(!object){
        console.error(`load trigger error：Invalid 'object_name' /r ${triggerPath}`)
        return
    }
    
    if(!object.triggers){
        object.triggers = {}
    }

    _.each(trigger, (attr, key)=>{
        console.log('attr', key, attr);
        let tm = triggerMapping[key]
        if(!_.isEmpty(tm)){
            let tkey = `_${key}`.toLocaleUpperCase();
            object.triggers[tkey] = _.extend({}, tm, {
                todo: attr
            })
        }
    })

    loadObjectInCreator(object);
}

if(fs.statSync(srcDirectory).isDirectory()){
    fs.readdir(srcDirectory, (err, appFiles)=>{
        //读取 app
        const appFilePath = path.join(srcDirectory, appFileName)
        if(fs.existsSync(appFilePath)){
            loadApp(appFilePath);
            fs.watchFile(appFilePath, (curr, prev) => {
                loadApp(appFilePath);
            });
        }
        
        //读取 object
        const objectFolderPath = path.join(srcDirectory, objectFolderName)
        if(fs.existsSync(objectFolderPath)){
            fs.readdir(objectFolderPath, (err, objectFiles)=>{
                _.each(objectFiles, (aof)=>{
                    const objectPath = path.join(objectFolderPath, aof);
                    loadObject(objectPath);
                    fs.watchFile(objectPath, (curr, prev) => {
                        loadObject(objectPath);
                    });
                })
            })
        }

        //读取 triggers
        const triggerFolderPath = path.join(srcDirectory, triggerFolderName)
        if (fs.existsSync(triggerFolderPath)) {
            fs.readdir(triggerFolderPath, (err, triggerFiles)=>{
                _.each(triggerFiles, (tf)=>{
                    const triggerPath = path.join(triggerFolderPath, tf);
                    loadTrigger(triggerPath)
                })
            })
        }

    })

    //监控apps文件夹变化
    fs.watch(srcDirectory, (eventType, filename)=>{
        console.log('fs.watch', eventType, filename);
    })
}