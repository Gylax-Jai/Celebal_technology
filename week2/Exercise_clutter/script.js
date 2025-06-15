// import path from "path";
const path=require("path");
const fs=require("fs");

let mypath="C:\\Users\\jaisi\\OneDrive\\Desktop\\SIGMA_COURSE\\jai_course\\BACKEND\\exercise_clutter";


let newfolder=path.join(mypath,"organised_files");
if(!fs.existsSync(newfolder)){
    fs.mkdirSync(newfolder);
    console.log("directory created")
}

fs.readdir(newfolder,(error,files)=>{
    if(error){
    console.log("error reading directory");
    return;}

    files.forEach((file)=>{
            const fullpath=path.join(newfolder,file)
            if(fs.lstatSync(fullpath).isFile()){
               const ext=  path.extname(file);
               const extfolder=path.join(newfolder,ext);
               if(!fs.existsSync(extfolder)){
                    fs.mkdirSync(extfolder);
               }
                const destpath=path.join(extfolder,file);
                fs.rename(fullpath,destpath ,(error)=>{
                    if(error){
                        console.log("error renaming file");
                }
                else{
                    console.log("files moved");
                }
            
        
            });
            }
            
        });
})