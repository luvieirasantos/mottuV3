# Mottu - Pátio Digital

## 📱 Sobre o Projeto

Mottu é uma aplicação mobile desenvolvida em React Native/Expo para gerenciamento digital de pátios. O sistema permite o controle e monitoramento de motos, incluindo localização, status e métricas de operação.


## 📱 Link da Versão Publicada no Expo

**Link do Expo Go:**

https://expo.dev/accounts/luvieirasantos/projects/bolt-expo-nativewind/updates/aac25f3b-aef0-48b2-9198-0ffa2b61a7ce

### QRCode para Instalação Direta

![QRCode Expo](https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://expo.dev/accounts/luvieirasantos/projects/bolt-expo-nativewind/updates/aac25f3b-aef0-48b2-9198-0ffa2b61a7ce)

**Como usar:**
1. Instale o app **Expo Go** no seu celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/br/app/expo-go/id982107779))
2. Escaneie o QRCode acima
3. O app será carregado automaticamente

## 📱 Credenciais de teste

**credenciais:**
user: henrique3.terceiro@gmail.com
password: 123456

### 🔓 Modo Demo
Para testar a aplicação sem fazer login na API, use o botão **"Entrar sem requisição da API"** na tela de login. Este modo cria um usuário demo e permite acessar todas as funcionalidades do app.

## 👥 Integrantes da Equipe
- Lu Vieira Santos — RM: 558935
- Melissa Pereira — RM: 555656
- Diego Furigo — RM: 558755

## 📋 Entrega Sprint 4 - Informações do Projeto



### 🔖 Commit Final da Entrega
**Hash do Commit:** `13f38799b9f8ec8b8cc634028c9cb3079c0d9daf`

Para verificar este commit:
```bash
git checkout 29e453968a2d989c2b4d31dac4e836493655b5aa
```

## ✨ Funcionalidades

- **Autenticação Segura**: Login e cadastro via API externa com JWT
- **Gerenciamento de Motos**: Controle de status (ativa, oficina, baixa)
- **Localização em Tempo Real**: Sistema de trilateração para posicionamento
- **Métricas e Relatórios**: Análise de dados operacionais
- **Interface Moderna**: Design responsivo com tema claro/escuro
- **BLE Simulation**: Simulação de dispositivos Bluetooth Low Energy

## 🚀 Tecnologias

- **Frontend**: React Native, Expo
- **UI Components**: React Native Paper
- **Navegação**: Expo Router
- **Formulários**: React Hook Form + Zod
- **Estado**: React Hooks
- **Armazenamento**: AsyncStorage
- **Autenticação**: JWT via API externa

## 🔐 Sistema de Autenticação

### API Externa
- **URL Base**: `https://api-mottu-sp3-java.onrender.com`
- **Endpoints**:
  - `POST /api/auth/login` - Autenticação de usuários
  - `POST /api/auth/cadastro` - Cadastro de novos usuários

### Formato da Resposta
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "tipo": "Bearer",
  "nome": "Nome do Usuário",
  "email": "email@exemplo.com",
  "perfil": "USUARIO"
}
```

### Segurança
- Tokens JWT com expiração de 2 meses
- Validação automática de tokens
- Logout automático em caso de token inválido
- Headers de autorização com Bearer token

## 📁 Estrutura do Projeto

```
mottuV3/
├── app/                          # Telas da aplicação (Expo Router)
│   ├── (auth)/                  # Telas de autenticação
│   │   ├── login.tsx           # Tela de login
│   │   └── cadastro.tsx        # Tela de cadastro
│   └── (tabs)/                 # Telas principais
│       ├── index.tsx           # Dashboard
│       ├── mapa.tsx            # Mapa de motos
│       ├── historico.tsx       # Histórico de operações
│       ├── relatorios.tsx      # Relatórios e métricas
│       └── config.tsx          # Configurações
├── src/
│   ├── components/              # Componentes reutilizáveis
│   ├── contexts/                # Contextos React
│   ├── hooks/                   # Hooks customizados
│   ├── services/                # Serviços (API, Auth)
│   ├── types/                   # Definições de tipos
│   ├── utils/                   # Utilitários e constantes
│   └── theme/                   # Temas e estilos
├── docs/                        # Documentação
├── examples/                     # Exemplos de uso
└── assets/                      # Imagens e recursos
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Expo CLI
- Android Studio / Xcode (para desenvolvimento nativo)

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd mottuV3
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **(Opcional) Configure as variáveis de ambiente**
```bash
# Para configurações avançadas, copie o arquivo de exemplo
cp .env.example .env

# A URL da API já está configurada por padrão para o Render
# Não é necessário configurar nada para uso básico
```

4. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
```

## 🔧 Configuração da API

### Variáveis de Ambiente
```env
# API Configuration
API_BASE_URL=https://api-mottu-sp3-java.onrender.com
API_TIMEOUT=10000
API_RETRY_ATTEMPTS=3

# JWT Configuration
JWT_SECRET=mottuSecretKey2024Sprint3JavaAdvancedFIAP
JWT_EXPIRATION=5184000000
```

### Debug e Logs
Para habilitar logs detalhados, edite `src/config/debug.ts`:
```typescript
export const DEBUG_CONFIG = {
  ENABLE_API_LOGS: true,        // Logs da API
  ENABLE_AUTH_LOGS: true,       // Logs de autenticação
  ENABLE_REQUEST_LOGS: true,    // Logs de requisições
  ENABLE_RESPONSE_LOGS: true,   // Logs de respostas
  ENABLE_ERROR_LOGS: true,      // Logs de erro
  SHOW_SENSITIVE_DATA: false,   // Mostrar dados sensíveis
};
```

## 🚀 Deploy no Render

### Configuração Básica (Recomendada)

A aplicação já vem configurada com a URL da API do Render por padrão. Para deploy básico:

1. **Conecte seu repositório no Render**
2. **Configure as seguintes opções**:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 18 ou superior

### Configuração Avançada com Variáveis de Ambiente (Opcional)

Para personalizar configurações, adicione as seguintes variáveis no painel "Environment":

```env
API_BASE_URL=https://api-mottu-sp3-java.onrender.com
NODE_ENV=production
JWT_SECRET=mottuSecretKey2024Sprint3JavaAdvancedFIAP
TOKEN_EXPIRATION=5184000000
REFRESH_THRESHOLD=86400000
ENABLE_LOGS=false
ENABLE_API_TESTS=false
MOCK_API_RESPONSES=false
```

## 📖 Como Usar

### Autenticação
```typescript
import { useAuth } from '@/src/hooks/useAuth';

const { login, register, logout, user } = useAuth();

// Login
await login('email@exemplo.com', 'senha123');

// Cadastro
await register('Nome do Usuário', 'email@exemplo.com', 'senha123');

// Logout
await logout();
```

### Requisições Autenticadas
```typescript
import { useApi } from '@/src/hooks/useApi';

const { makeAuthenticatedRequest, isLoading, error } = useApi({
  onUnauthorized: () => {
    // Redirecionar para login se não autorizado
    router.replace('/(auth)/login');
  }
});

const data = await makeAuthenticatedRequest('/api/endpoint');
```

### Testes da API
```typescript
import { testApiConnection, testRegisterEndpoint, testApiResponseFormat } from '@/src/utils/api.test';

// Testar conectividade
const connectionTest = await testApiConnection();

// Testar endpoint de cadastro
const registerTest = await testRegisterEndpoint();

// Analisar formato da resposta
const formatTest = await testApiResponseFormat();
```

## 🧪 Testes e Debugging

### Funções de Teste Disponíveis
- `testApiConnection()` - Testa conectividade básica
- `testRegisterEndpoint()` - Testa endpoint de cadastro
- `testApiResponseFormat()` - Analisa estrutura da resposta

### Logs de Debug
- `[DEBUG REQUEST]` - Detalhes da requisição
- `[DEBUG RESPONSE]` - Detalhes da resposta
- `[DEBUG ERROR]` - Erros detalhados

## 📚 Documentação

- **`docs/AUTHENTICATION.md`** - Sistema de autenticação completo
- **`docs/DEBUGGING.md`** - Guia de debugging e resolução de problemas
- **`docs/CORRECOES.md`** - Documentação das correções implementadas

## 🐛 Resolução de Problemas

### Erro "Resposta inválida da API"
✅ **RESOLVIDO**: O problema foi causado por incompatibilidade entre o formato esperado e o formato real da API.

**Solução implementada:**
- Tipos atualizados para refletir a estrutura real
- Validação corrigida para verificar os campos corretos
- Mapeamento ajustado para converter dados corretamente
- Logs detalhados para debugging futuro

### Problemas Comuns
1. **Token expirado**: Faça logout e login novamente
2. **Erro de conectividade**: Verifique a conexão com a internet
3. **Credenciais inválidas**: Verifique email e senha

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request



## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte técnico ou dúvidas:
- Abra uma issue no repositório
- Consulte a documentação em `docs/`
- Verifique os logs de debug para identificar problemas

## 🔄 Changelog

### v3.2.0 - Modo Demo e Login sem API
- ✅ Adição de botão "Entrar sem requisição da API" na tela de login
- ✅ Implementação de login demo que cria usuário mock sem chamar a API
- ✅ Funcionalidade completa para desenvolvimento e testes
- ✅ Documentação do modo demo no README
- ✅ Atualização do changelog

### v3.1.0 - Configuração de Ambiente e Deploy
- ✅ Atualização do .gitignore com arquivos comuns do React Native/Expo
- ✅ Criação do arquivo .env.example para documentar variáveis de ambiente
- ✅ Migração da API para Render (https://api-mottu-sp3-java.onrender.com)
- ✅ Configuração hardcoded da API para uso imediato (npm install + npm start)
- ✅ Documentação completa para deploy no Render
- ✅ Atualização do README com instruções de configuração

### v3.0.0 - Sistema de Autenticação via API
- ✅ Migração para autenticação via API externa
- ✅ Implementação de JWT tokens
- ✅ Sistema de debug e logs detalhados
- ✅ Funções de teste para API
- ✅ Documentação completa
- ✅ Correção de erros de validação

### v2.0.0 - Funcionalidades Core
- Sistema de gerenciamento de motos
- Localização e trilateração
- Métricas e relatórios
- Interface responsiva

### v1.0.0 - MVP
- Autenticação local
- Interface básica
- Funcionalidades essenciais

---

**Desenvolvido com ❤️ pela Lu**