const fs=require('node:fs');const path=require('node:path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'dist');
fs.mkdirSync(out,{recursive:true});
for(const name of ['index.html','assets','mkt','demo'])fs.cpSync(path.join(root,name),path.join(out,name),{recursive:true});
fs.writeFileSync(path.join(out,'_headers'),'/demo/*\n  X-Robots-Tag: noindex\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n');
const sha=require('node:child_process').execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
fs.writeFileSync(path.join(out,'demo','release.json'),JSON.stringify({sha,builtAt:new Date().toISOString(),scope:'demo site + manutencao mensal'},null,2));
console.log('Build estático: home + assets + mkt + demo. Documentação operacional excluída.');
