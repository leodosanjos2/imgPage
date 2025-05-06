import { defineConfig } from 'vite';

export default defineConfig({
  // Configurações padrão (opcional)
  publicDir: 'public',       // Pasta para arquivos estáticos (imagens, fonts, etc.)
  build: {
    outDir: 'dist',          // Pasta onde os arquivos buildados serão gerados
    emptyOutDir: true,       // Limpa a pasta 'dist' antes de cada build
  },
  server: {
    open: true,              // Abre o navegador automaticamente ao iniciar o servidor
    port: 5173,              // Porta do servidor de desenvolvimento (opcional)
  }
});