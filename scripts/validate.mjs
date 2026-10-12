import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'../dist');
async function files(dir){const entries=await fs.readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?files(path.join(dir,e.name)):path.join(dir,e.name)))).flat();}
const all=await files(root);let links=0;
for(const file of all.filter(f=>f.endsWith('.html'))){const html=await fs.readFile(file,'utf8');assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`One h1: ${file}`);assert(!html.includes('reference/'),'Private source reference leaked');assert(html.includes('name="description"'),'Description missing');for(const m of html.matchAll(/(?:href|src)="([^"#]+)(?:#([^"]*))?"/g)){const target=m[1];if(!target.startsWith('/the-last-daughter/'))continue;let local=path.join(root,target.slice('/the-last-daughter/'.length));if(target.endsWith('/'))local=path.join(local,'index.html');assert(all.includes(local),`Broken asset or link: ${target} on ${file}`);if(m[2]){const page=await fs.readFile(local,'utf8');assert(page.includes(`id="${m[2]}"`),`Missing anchor ${m[2]}`);}links++;}}
const css=await fs.readFile(path.join(root,'style.css'),'utf8');for(const m of css.matchAll(/url\(['"]?\.\/([^)'" ]+)/g))assert(all.includes(path.join(root,m[1])),`Missing CSS asset ${m[1]}`);
assert(!all.some(f=>/reference|\.md$|\.env|\.pdf$|\.zip$/i.test(path.relative(root,f))),'Nonpublic materials in build');
console.log(`PASS: ${all.filter(f=>f.endsWith('.html')).length} pages, ${links} internal links/assets, CSS assets, anchors, metadata, and public-output boundary.`);
