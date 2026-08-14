import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const forwarded = process.argv.slice(2);
let hostname = '0.0.0.0';
let port = '4173';

for (let index = 0; index < forwarded.length; index += 1) {
  const argument = forwarded[index];

  if (argument === '--host' || argument === '--hostname') {
    hostname = forwarded[index + 1] ?? hostname;
    index += 1;
  } else if (argument.startsWith('--host=')) {
    hostname = argument.slice(argument.indexOf('=') + 1);
  } else if (argument.startsWith('--hostname=')) {
    hostname = argument.slice(argument.indexOf('=') + 1);
  } else if (argument === '--port') {
    port = forwarded[index + 1] ?? port;
    index += 1;
  } else if (argument.startsWith('--port=')) {
    port = argument.slice(argument.indexOf('=') + 1);
  }
}

const nextBin = fileURLToPath(new URL('../node_modules/next/dist/bin/next', import.meta.url));
const child = spawn(process.execPath, [nextBin, 'dev', '--hostname', hostname, '--port', port], {
  stdio: 'inherit',
  env: process.env,
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
