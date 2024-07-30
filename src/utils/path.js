import path from 'path';

const makeAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

export default makeAbsolutePath;
