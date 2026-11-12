import { tool } from "langchain";
import * as z from "zod";
// import fs from 'fs'

export const upsertFileTool = tool(
    async function ({files}) {
        await Promise.all((files.map(async(file)=>{
          return await fs.writeFile(file.path,file.content)
        })))
        return "file created succefully"
    }, 

    {
  name: "upsertFile",
  description:
    "Create/Update multiple files at once (creaate one if not existed)",
  schema: z.object({
    files: z.array(
      z.object({
        path: z
          .string()
          .describe("absolute of the file and to be created/update"),
        content: z
          .string()
          .describe("content of the file to be created/update"),
      }),
    ),
  }),
});


export const deleteFilesTools={}