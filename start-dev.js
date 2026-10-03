const { spawn } = require('child_process');

console.log('=================================================');
console.log('🌱 Starting Parvarish Full-Stack Platform');
console.log('📡 Backend API:  http://localhost:5000');
console.log('💻 Frontend App: http://localhost:3000');
console.log('=================================================\n');

const backend = spawn('npm', ['--prefix', 'backend', 'run', 'dev'], { stdio: 'inherit', shell: true });
const frontend = spawn('npm', ['--prefix', 'frontend', 'run', 'dev'], { stdio: 'inherit', shell: true });

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit(0);
});
