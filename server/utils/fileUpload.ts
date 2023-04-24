import fs from 'fs';
import path from 'path';
import first from 'lodash/first';
import mime from 'mime-types';

function getFileDetails(filePath): Promise<fs.Stats> {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) reject(err.message);
      resolve(stats);
    });
  });
}

export function deleteFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) reject(err.message);
      resolve('deleted');
    });
  });
}

export async function uploadToLibrary(data, fileName) {
  const filePath = `./${fileName}.png`;

  try {
    fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
  } catch (error) {
    console.error('saveMedia', error);
  }
  const image = await upload(filePath);
  return image;
}

async function upload(filePath) {
  const stats = await getFileDetails(filePath);
  const fileName = path.parse(filePath).base;

  const res = await strapi.plugins.upload.services.upload.upload({
    data: {},
    files: {
      path: filePath,
      name: fileName,
      type: mime.lookup(filePath),
      size: stats.size,
    },
  });

  await deleteFile(filePath);
  return first(res);
}
