
import { PDFParse } from 'pdf-parse';
import fs from 'fs';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";



const parser = new PDFParse({
    data: await fs.promises.readFile('./story.pdf')
});

const text = await parser.getText();

console.log(text);

const textSplister= new RecursiveCharacterTextSplitter({
    chunkSize:500,
    chunkOverlap:100
})

console.log(textSplister)
