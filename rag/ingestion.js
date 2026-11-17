
import { PDFParse } from 'pdf-parse';
import fs from 'fs';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import {CohereEmbeddings} from "@langchain/cohere"
import dotenv from 'dotenv'
dotenv.config()


const parser = new PDFParse({
    data: await fs.promises.readFile('./story.pdf')
});

const text = (await parser.getText()).text;



const textSplister= new RecursiveCharacterTextSplitter({
    chunkSize:500,
    chunkOverlap:100
})

const chunks=await textSplister.splitText(text)



//implement embading modeles

const embeddings=new CohereEmbeddings({
    model:"embed-v5.0-fast",
    apiKey:process.env.COHERE_API_KEY
})

const vecter=await embeddings.embedDocuments(chunks)

console.log(vecter)
