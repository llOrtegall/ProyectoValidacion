import { Router } from 'express';
import { readdirSync } from 'node:fs';

const PATH_ROUTER = `${__dirname}`;
const router = Router()

const cleanFileName = (filename: string) => {
  const file = filename.split('.').shift();
  return file;
}

readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanName = cleanFileName(filename);
  if (cleanName !== 'Index') {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router)
    })
  }
});

export { router };