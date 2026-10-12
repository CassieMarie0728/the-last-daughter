import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
const artifacts=process.env.QA_OUTPUT||path.resolve('qa-output');
await fs.mkdir(artifacts,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1536,height:1024},reducedMotion:'reduce'});
const page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
const base=process.env.QA_URL||'http://127.0.0.1:4173/the-last-daughter/';
const routes=['','book/','characters/','world/','excerpt/','author/','reader-guide/','press/','privacy/'];
for(const route of routes){await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);await page.locator('img[src]').evaluateAll(images=>Promise.all(images.map(im=>{im.loading='eager';return im.decode().catch(()=>{});})));assert(await page.locator('h1').isVisible());assert(await page.locator('img[src]').evaluateAll(images=>images.every(im=>im.complete&&im.naturalWidth>0)),`Images failed: ${route}`);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Desktop overflow: ${route}`);if(['','characters/','world/','excerpt/'].includes(route))await page.screenshot({path:path.join(artifacts,(route.replace('/','')||'home')+'-desktop.png'),fullPage:route==='world/'||route==='excerpt/'});}
await page.goto(base);await page.locator('#enter').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(artifacts,'home-continuation.png')});
await page.goto(base+'characters/');await page.getByRole('button',{name:'Enlarge portrait of Madisyn Fyre',exact:true}).click();assert(await page.locator('dialog').isVisible());await page.keyboard.press('Escape');assert(!await page.locator('dialog').isVisible());assert(await page.getByRole('button',{name:'Enlarge portrait of Madisyn Fyre',exact:true}).evaluate(el=>el===document.activeElement),'Dialog focus not restored');
await page.goto(base+'world/');await page.getByRole('button',{name:'Enlarge the illustrated map of Aethrakar'}).click();assert(await page.locator('dialog').isVisible());await page.getByRole('button',{name:'Close artwork'}).click();
await page.goto(base+'excerpt/');const before=await page.locator('.reader-prose').evaluate(el=>parseFloat(getComputedStyle(el).fontSize));await page.getByRole('button',{name:'Increase reading text size'}).click();assert.equal(await page.locator('.reader-prose').evaluate(el=>parseFloat(getComputedStyle(el).fontSize)),before+2);await page.getByRole('button',{name:'Light page',exact:true}).click();await page.reload();assert(await page.locator('body').evaluate(el=>el.classList.contains('reader-light')));assert.equal(await page.locator('.reader-prose').evaluate(el=>parseFloat(getComputedStyle(el).fontSize)),before+2);await page.screenshot({path:path.join(artifacts,'reader-light.png')});
await page.goto(base+'privacy/');await page.getByRole('button',{name:'Clear reading preferences'}).click();assert.equal(await page.locator('#privacy-status').textContent(),'Reading preferences cleared.');
await page.goto(base+'reader-guide/');await page.getByText('Content notes',{exact:true}).click();assert(await page.getByText('The novel includes violence',{exact:false}).isVisible());
for(const width of [390,320,768]){await page.setViewportSize({width,height:844});for(const route of routes){await page.goto(base+route);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Mobile overflow ${width}: ${route}`);if(width===390&&['','characters/','excerpt/'].includes(route))await page.screenshot({path:path.join(artifacts,(route.replace('/','')||'home')+'-mobile.png'),fullPage:route!==''});}await page.goto(base);await page.getByRole('button',{name:/Menu/}).click();assert(await page.getByRole('navigation',{name:'Main navigation'}).isVisible());await page.getByRole('link',{name:'The World',exact:true}).click();assert(page.url().endsWith('/world/'));}
assert.deepEqual(errors,[]);
await context.close();await browser.close();console.log('PASS: 9 routes at desktop and 3 mobile widths; images, overflow, menus, dialogs, focus return, reader preferences, content disclosure, and zero browser errors.');
