import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const dest = path.join(root, 'public/assets');
await fs.mkdir(dest, {recursive:true});
const inputs = {
  cover:'covers/the-last-daughter-front-cover.png',
  madisyn:'characters/madisyn-fyre/madisyn-main.png',
  corwin:'characters/corwin/corwin-main.png',
  elian:'characters/elian/elian-main.png',
  sable:'characters/sable/sable-main.png',
  talia:'characters/talia-renn/talia-renn-main.png',
  vane:'characters/vane/inquisitor-vane-main.png',
  seraphine:'characters/seraphine/seraphine-main.png',
  map:'maps/aethrakar-map.png',
  thornhearth:'locations/primary-location-stills/thornhearth/thornhearth-location-still-1.png',
  embercrest:'locations/primary-location-stills/embercrest-mountains/embercrest-mountains-location-still-1.png',
  observatory:'locations/primary-location-stills/corwin_s-observatory/corwin_s-observatory-location-still-1.png',
  veilwoods:'locations/primary-location-stills/the-veilwoods/the-veilwoods-location-still-1.png',
};
for (const [name,input] of Object.entries(inputs)) {
  await sharp(path.join(root,'reference/images',input)).resize({width:name==='map'?1800:1200,withoutEnlargement:true}).webp({quality:85}).toFile(path.join(dest,`${name}.webp`));
}
const generated = 'C:/Users/c728/.codex/generated_images/01a12eeb-54a3-7b42-8398-26482f6a1198';
await sharp(path.join(generated,'exec-05199a76-444c-4879-9eec-5c03d0817f22.png')).webp({quality:88}).toFile(path.join(dest,'hero.webp'));
await sharp(path.join(root,'reference/images/covers/the-last-daughter-front-cover.png')).resize({width:640}).jpeg({quality:88}).toFile(path.join(dest,'cover.jpg'));
const manuscript = await fs.readFile(path.join(root,'reference/AETHRAKAR_ALL_UPDATED_FILES_2026-10-08/The_Embercrest_Awakening_2026-10-08.md'),'utf8');
const start=manuscript.indexOf('By the time Madisyn');
const last='She ducked under the gate.';
const end=manuscript.indexOf(last,start)+last.length;
if(start<0||end<start)throw new Error('Excerpt boundaries not found');
await fs.writeFile(path.join(root,'content/excerpt.txt'),manuscript.slice(start,end).replaceAll('\r\n','\n'));
console.log('Prepared selected public artwork and exact opening excerpt; originals unchanged.');
