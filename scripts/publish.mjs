import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const run=(args,options={})=>execFileSync('git',args,{cwd:root,encoding:'utf8',...options}).trim();
const remote=run(['remote','get-url','origin']);
if(!/^https:\/\/github\.com\/CassieMarie0728\/the-last-daughter(?:\.git)?$/.test(remote))throw new Error('Unexpected publication repository; update the explicit destination before publishing.');
execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root,stdio:'inherit'});
execFileSync(process.execPath,['scripts/validate.mjs'],{cwd:root,stdio:'inherit'});
const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'last-daughter-publish-'));
const index=path.join(temporary,'index');
const env={...process.env,GIT_INDEX_FILE:index,GIT_WORK_TREE:path.join(root,'dist'),GIT_DIR:run(['rev-parse','--absolute-git-dir'])};
try{
 run(['read-tree','--empty'],{env});
 run(['add','--all','--','.'],{cwd:path.join(root,'dist'),env});
 const tree=run(['write-tree'],{env});
 const remoteRef=run(['ls-remote','origin','refs/heads/gh-pages']);
 let parent='';
 if(remoteRef){run(['fetch','origin','gh-pages']);parent=run(['rev-parse','FETCH_HEAD']);}
 const commit=run(['commit-tree',tree,...(parent?['-p',parent]:[]),'-m','Publish The Embercrest Awakening website']);
 run(['update-ref','refs/heads/gh-pages',commit]);
 console.log(run(['push','origin','gh-pages']));
 console.log(`Published static site commit ${commit}`);
}finally{
 // Only the temporary index files created above are removed. No recursive cleanup.
 for(const item of [index,index+'.lock'])if(fs.existsSync(item))fs.unlinkSync(item);
 fs.rmdirSync(temporary);
}
