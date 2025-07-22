// ===== SERVIDOR PRINCIPAL V10.0 - COM SISTEMA DE LOGIN =====
const express = require('express');
const { setupMiddleware } = require('./src/middleware/setup');
const { setupRoutes } = require('./src/routes/index');
const { loadEnvironment, validateConfiguration } = require('./src/config/environment');
const { initializeServices } = require('./src/services/initialize');

// ===== NOVOS IMPORTS PARA AUTENTICAÇÃO =====
const { setupAuthRoutes } = require('./src/middleware/auth');
const { authPageMiddleware, setupLoginRoute } = require('./src/middleware/auth-middleware');

async function startServer() {
    try {
        console.log('\n🚀 INICIANDO SERVIDOR V10.0 - COM SISTEMA DE LOGIN');
        console.log('=========================================================');
        
        // ===== CARREGAR CONFIGURAÇÕES =====
        const config = loadEnvironment();
        const validation = validateConfiguration(config);
        
        if (!validation.valid) {
            console.log('⚠️ Configuração com problemas, mas continuando...');
            validation.errors.forEach(error => console.log(`   ❌ ${error}`));
        }
        
        // ===== CRIAR APP EXPRESS =====
        const app = express();
        const PORT = config.PORT || 3001;
        
        // ===== CONFIGURAR MIDDLEWARE BÁSICO =====
        setupMiddleware(app);
        
        // ===== 🔐 NOVO: CONFIGURAR AUTENTICAÇÃO =====
        console.log('🔐 Configurando sistema de autenticação...');
        
        // Middleware de autenticação para páginas
        app.use(authPageMiddleware);
        
        // Rotas de autenticação
        setupAuthRoutes(app);
        
        // Rota de login
        setupLoginRoute(app);
        
        console.log('✅ Sistema de autenticação configurado!');
        
        // ===== INICIALIZAR SERVIÇOS =====
        await initializeServices(config);
        
        // ===== CONFIGURAR ROTAS EXISTENTES =====
        setupRoutes(app);
        
        // ===== INICIAR SERVIDOR =====
        const server = app.listen(PORT, () => {
            console.log('\n✅ SERVIDOR V10.0 INICIADO COM SUCESSO!');
            console.log('=====================================');
            console.log(`📡 Rodando em: http://localhost:${PORT}`);
            console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
            console.log(`⏰ Iniciado em: ${new Date().toLocaleString('pt-BR')}`);
            
            console.log('\n🔐 SISTEMA DE LOGIN V10.0 ATIVO:');
            console.log('   🚪 Login via email + token (Resend)');
            console.log('   👤 Login via usuário/senha');
            console.log('   🕒 Sessões de 24 horas');
            console.log('   🔒 Proteção automática de páginas');
            console.log('   🚪 Logout automático');
            
            console.log('\n📋 FUNCIONALIDADES V10.0 ATIVAS:');
            console.log('   🚀 Sistema híbrido completo');
            console.log('   📤 SocialBu mídia upload CORRIGIDO');
            console.log('   📅 SocialBu sincronização de posts agendados');
            console.log('   🍽️ Chef Alex Cuca integrada');
            console.log('   📊 Analytics com dados reais');
            console.log('   📱 Interface completa');
            console.log('   🏆 Top Vídeos híbrido (12 redes)');
            console.log('   🔐 Sistema de login completo');
            
            console.log('\n🔗 LINKS PRINCIPAIS:');
            console.log(`   🔐 Login: http://localhost:${PORT}/login.html`);
            console.log(`   🏠 Início: http://localhost:${PORT}`);
            console.log(`   📅 Calendário: http://localhost:${PORT}/calendar.html`);
            console.log(`   📊 Analytics: http://localhost:${PORT}/analytics.html`);
            console.log(`   🏆 Top Vídeos: http://localhost:${PORT}/top-videos.html`);
            console.log(`   ⚙️ Config: http://localhost:${PORT}/config.html`);
            
            console.log('\n🛠️ APIS V10.0 DISPONÍVEIS:');
            console.log(`   📋 Status: http://localhost:${PORT}/api/status`);
            console.log(`   🔐 Auth Status: http://localhost:${PORT}/api/auth/status`);
            console.log(`   📧 Send Token: POST /api/auth/send-token`);
            console.log(`   ✅ Verify Session: GET /api/auth/verify-session`);
            console.log(`   🚪 Logout: POST /api/auth/logout`);
            console.log(`   📅 Posts SocialBu: http://localhost:${PORT}/api/socialbu/scheduled-posts`);
            console.log(`   🔄 Sync SocialBu: http://localhost:${PORT}/api/socialbu/sync-scheduled`);
            console.log(`   🏆 Top Videos: http://localhost:${PORT}/api/get-all-top-videos`);
            
            console.log('\n🎯 CONFIGURAÇÃO DE LOGIN:');
            console.log('   📧 Emails permitidos:');
            console.log('      - admin@socialmedia.com');
            console.log('      - user@test.com');
            console.log('      - demo@demo.com');
            console.log('   👤 Usuários demo:');
            console.log('      - admin / admin123');
            console.log('      - user / user123');
            console.log('      - demo / demo123');
            
            if (process.env.RESEND_API_KEY) {
                console.log('   ✅ Resend configurado - emails reais');
            } else {
                console.log('   🎭 Resend não configurado - emails simulados');
                console.log('   💡 Para emails reais: npm install resend');
                console.log('   💡 Adicione RESEND_API_KEY no .env');
            }
            
            console.log('\n🌐 DEPLOY VERCEL:');
            console.log('   📄 vercel.json configurado');
            console.log('   🔧 Comandos: npm run build, vercel deploy');
            console.log('   ⚙️ Env vars: copiar .env para Vercel');
        });
        
        // ===== TRATAMENTO DE ERROS =====
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ Porta ${PORT} já está em uso!`);
                console.log('💡 Soluções:');
                console.log('   1. Pare outros servidores na porta 3001');
                console.log('   2. Use uma porta diferente: PORT=3002 npm start');
                process.exit(1);
            } else {
                console.error('❌ Erro no servidor:', error);
                process.exit(1);
            }
        });
        
        // ===== GRACEFUL SHUTDOWN =====
        process.on('SIGINT', () => {
            console.log('\n🛑 Parando servidor V10.0...');
            server.close(() => {
                console.log('✅ Servidor parado com segurança');
                process.exit(0);
            });
        });
        
        process.on('SIGTERM', () => {
            console.log('\n🛑 SIGTERM recebido, parando servidor...');
            server.close(() => {
                console.log('✅ Servidor parado com segurança');
                process.exit(0);
            });
        });
        
        // ===== TRATAMENTO DE EXCEÇÕES =====
        process.on('uncaughtException', (error) => {
            console.error('❌ Exceção não capturada:', error);
            console.log('🔄 Reinicie o servidor para garantir estabilidade');
        });
        
        process.on('unhandledRejection', (reason, promise) => {
            console.error('❌ Promise rejeitada não tratada:', reason);
            console.log('Promise:', promise);
        });
        
    } catch (error) {
        console.error('❌ Erro crítico ao iniciar servidor V10.0:', error);
        process.exit(1);
    }
}

// ===== INICIAR SERVIDOR =====
if (require.main === module) {
    startServer().catch(error => {
        console.error('❌ Falha ao iniciar servidor:', error);
        process.exit(1);
    });
}

module.exports = { startServer };