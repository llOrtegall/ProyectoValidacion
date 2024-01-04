import { Router } from 'express';
import { readdirSync } from 'node:fs';

const PATH_ROUTER = `${__dirname}`;

export const router = Router()

/**
 * TODO: Este método se encarga de limpiar el nombre del archivo para poder importar el módulo correctamente
 * * Del mismo modo su ruta en el router será el nombre del archivo
 * @param filename 
 * @returns 
 */

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

