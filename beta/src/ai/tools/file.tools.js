
import { tool } from "langchain";
import * as z from "zod";
import fs from 'fs/promises'
import { readdir } from "fs";

// import fs from 'fs'

export const upsertFile = tool(
    async function ({ files }) {
        await Promise.all(files.map(async (file) => {
            return await fs.writeFile(file.path, file.content)
        }))

        return "file created successfully"
    },

    {
        name: "upsertFile",
        description:
            "Create/Update multiple files at once (create one if not existed)",
        schema: z.object({
            files: z.array(
                z.object({
                    path: z
                        .string()
                        .describe("absolute path of the file to be created/updated"),
                    content: z
                        .string()
                        .describe("content of the file to be created/updated"),
                }),
            ),
        }),
    }
);

export const deleteFilesTools = {};


export const listFiles=tool(
  async function({folder}){
    const results=[]
    async function traverse(currentFolder){
      const entries=await fs.readdir(currentFolder,{withFileTypes:true})
      for(const entry of entries){
        const fullPath=`${currentFolder}/${entry.name}`
        if(entry.isDirectory()){
          if(entry.name=="node_modules")continue
          await traverse(fullPath)
        }else{
          results.push(fullPath)
        }
      }
    }
    await traverse(folder)
    return JSON.stringify(results)
  },
  {
    name:"listFiles",
    description:"List all folder (recursively) and files in the current folder (ignore folder like node_modules)",
    schema:z.object({
      folder:z.string().describe("absolute path of folder to list")
    })
  }
  
)


export const readFile=tool(
  async function({files}){
    const results=await Promise.all(files.map(async(file)=>{
      const content=await fs.readFile(file.path,"utf-8")
      return {path:file.path,content}
    }))
    return JSON.stringify(results)
  },{
    name:"readFiles",
    description:"Read the content of multiple files at once",
    schema:z.object({
      files:z.array(z.object({
        path:z.string().describe("absolute path of the file to be read")
      }))
    })
  }
)