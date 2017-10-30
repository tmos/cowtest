import fs from 'fs';

const header = fs.readFileSync(`${__dirname}/header.html`, 'utf8');
const footer = fs.readFileSync(`${__dirname}/footer.html`, 'utf8');

export { header, footer };
