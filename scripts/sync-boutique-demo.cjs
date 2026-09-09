/**
 * Sincroniza a demo "Boutique" (hotel 5 estrelas) a partir do repo do template.
 *
 * A demo e servida como arquivos estaticos em /demo/boutique/, portanto o
 * resultado do build fica versionado neste repo. Isso mantem o deploy do
 * meuhotelonline sem etapa de build e sem dependencia de rede.
 *
 * Uso:
 *   node scripts/sync-boutique-demo.cjs                  # clona/atualiza e builda
 *   TEMPLATE_DIR=../hotel-boutique-luxury node scripts/... # usa clone local
 *
 * Depois de rodar, revise o diff e commite demo/boutique/.
 */
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const REPO = 'https://github.com/cspgabriel/hotel-boutique-luxury.git';
const BASE_PATH = '/demo/boutique';

// Canal comercial do Meu Hotel Online: a demo nunca deve enviar mensagem para
// o numero ficticio do template (pode pertencer a um terceiro real).
const DEMO_WHATSAPP = '5521997316583';
const DEMO_WHATSAPP_FORMATTED = '+55 (21) 99731-6583';
const DEMO_PHONE = '+5521997316583';
const DEMO_PHONE_FORMATTED = '+55 (21) 99731-6583';

const root = path.resolve(__dirname, '..');
const dest = path.join(root, 'demo', 'boutique');
const templateDir = process.env.TEMPLATE_DIR
  ? path.resolve(root, process.env.TEMPLATE_DIR)
  : path.join(root, '.cache', 'hotel-boutique-luxury');

// No Windows npm/npx sao .cmd e o Node se recusa a spawna-los sem shell
// (EINVAL). O shell e seguro aqui porque todos os argumentos deste script sao
// literais definidos acima — nada vem de entrada externa.
const needsShell = (cmd) => process.platform === 'win32' && cmd !== 'git';
const run = (cmd, args, cwd, env) =>
  execFileSync(cmd, args, {
    cwd,
    stdio: 'inherit',
    shell: needsShell(cmd),
    env: env ?? process.env,
  });

if (!fs.existsSync(templateDir)) {
  fs.mkdirSync(path.dirname(templateDir), { recursive: true });
  run('git', ['clone', '--depth', '1', REPO, templateDir]);
} else if (!process.env.TEMPLATE_DIR) {
  run('git', ['-C', templateDir, 'pull', '--ff-only']);
}

run('npm', ['ci'], templateDir);

// O cache do Next nao invalida quando as NEXT_PUBLIC_* mudam: um build
// reaproveitado silenciosamente manteria os contatos ficticios e o basePath
// antigo. Limpar antes de buildar e obrigatorio, nao otimizacao.
for (const dir of ['.next', 'out']) {
  fs.rmSync(path.join(templateDir, dir), { recursive: true, force: true });
}

run('npx', ['next', 'build'], templateDir, {
  ...process.env,
  NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  NEXT_PUBLIC_DEMO_BANNER: '1',
  NEXT_PUBLIC_DEMO_BANNER_HREF: '/',
  NEXT_PUBLIC_DEMO_WHATSAPP: DEMO_WHATSAPP,
  NEXT_PUBLIC_DEMO_WHATSAPP_FORMATTED: DEMO_WHATSAPP_FORMATTED,
  NEXT_PUBLIC_DEMO_PHONE: DEMO_PHONE,
  NEXT_PUBLIC_DEMO_PHONE_FORMATTED: DEMO_PHONE_FORMATTED,
});

const out = path.join(templateDir, 'out');
if (!fs.existsSync(out)) throw new Error(`Build nao gerou ${out}`);

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
fs.cpSync(out, dest, { recursive: true });

// robots.txt e sitemap.xml do template competem com os do site host e apontam
// para o dominio ficticio. A demo ja e noindex via _headers e via metadata.
// Os demais .txt do export sao payloads RSC usados na navegacao client-side:
// nao remover.
for (const f of ['robots.txt', 'sitemap.xml']) {
  fs.rmSync(path.join(dest, f), { force: true });
}

const sha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: templateDir, encoding: 'utf8' }).trim();
fs.writeFileSync(
  path.join(dest, 'source.json'),
  JSON.stringify({ repo: REPO, sha, basePath: BASE_PATH, syncedAt: new Date().toISOString() }, null, 2)
);

console.log(`Demo boutique sincronizada em demo/boutique (template ${sha.slice(0, 7)}).`);
