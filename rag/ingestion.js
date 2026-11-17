
import { PDFParse } from 'pdf-parse';
import fs from 'fs';

const parser = new PDFParse({
    data: await fs.promises.readFile('./story.pdf')
});

const text = await parser.getText();

console.log(text);
