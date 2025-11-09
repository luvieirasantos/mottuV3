# Mottu - Pátio Digital

## 📱 Sobre o Projeto

Mottu é uma aplicação mobile desenvolvida em React Native/Expo para gerenciamento digital de pátios. O sistema permite o controle e monitoramento de motos, incluindo localização, status e métricas de operação.

**SDK Expo:** 54.0.22
**React Native:** 0.81.5
**React:** 19.1.0

## 📱 video
https://youtu.be/z8TNBjPZm0E


## 📱 Link da Versão Publicada no Expo

### 🚀 Versão Atual: SDK 54.0.22 (v4.0.0)

**Link do Expo Go:**

https://expo.dev/accounts/luvieirasantos/projects/bolt-expo-nativewind/updates/fb3136a9-bf32-4fd4-ae6a-8b0a97bc292c

**Update IDs:**
- Runtime Version: 4.0.0
- Android: `86dbddce-768c-421e-89e8-bb2772d97c27`
- iOS: `f0e2f582-b8bb-4c80-a956-7dcc716b8b94`

### QRCode para Instalação Direta

![QRCode Expo](https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://expo.dev/accounts/luvieirasantos/projects/bolt-expo-nativewind/updates/fb3136a9-bf32-4fd4-ae6a-8b0a97bc292c)

**Como usar:**
1. Instale o app **Expo Go 3.0+** no seu celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/br/app/expo-go/id982107779))
2. Certifique-se de que o Expo Go está atualizado (necessário para SDK 54)
3. Escaneie o QRCode acima
4. O app será carregado automaticamente na SDK 54

### 🔄 Publicar Atualizações Futuras

Para publicar novas atualizações:

```bash
# Login (se necessário)
npx eas-cli login

# Publish com mensagem automática
npm run publish

# Ou com mensagem customizada
npm run publish:message
```

## 📱 Credenciais de teste

**credenciais:**
user: henrique3.terceiro@gmail.com
password: 123456

### 🔓 Modo Demo
A API de login esta publicada no render, oque pode gerar um atraso grande na hora de logar
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

- **Frontend**: React Native 0.81.5 (New Architecture enabled)
- **Framework**: Expo SDK 54.0.22
- **React**: 19.1.0
- **UI Components**: React Native Paper
- **Navegação**: Expo Router 6.0
- **Animações**: React Native Reanimated 4.1 + Worklets
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
- **Expo Go 3.0+** (no celular, para testar via QR code)
- Android Studio (para desenvolvimento Android nativo)
- **Xcode 16.1+** (para desenvolvimento iOS nativo - recomendado Xcode 26 para SDK 54)

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

3. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo para criar suas variáveis de ambiente
cp .env.example .env

# Edite o arquivo .env com suas configurações específicas
```

### 📋 Configuração das Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para configurar conexões com APIs e definir comportamentos da aplicação. Siga os passos abaixo para configurar corretamente:

#### 🔧 Passo a Passo

1. **Copie o arquivo de exemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Edite o arquivo `.env`** conforme suas necessidades:
   ```env
   # API Configuration
   API_BASE_URL=https://api-mottu-sp3-java.onrender.com

   # Environment
   NODE_ENV=development

   # Authentication
   JWT_SECRET=mottuSecretKey2024Sprint3JavaAdvancedFIAP
   TOKEN_EXPIRATION=5184000000
   REFRESH_THRESHOLD=86400000

   # Development Settings
   ENABLE_LOGS=true
   ENABLE_API_TESTS=true
   MOCK_API_RESPONSES=false
   ```

#### 📝 Descrição das Variáveis

| Variável | Descrição | Valor Padrão | Obrigatório |
|----------|-----------|--------------|-------------|
| `API_BASE_URL` | URL base da API de autenticação | `https://api-mottu-sp3-java.onrender.com` | Sim |
| `NODE_ENV` | Ambiente da aplicação (development/production) | `development` | Não |
| `JWT_SECRET` | Chave secreta para validação de tokens JWT | `mottuSecretKey2024Sprint3JavaAdvancedFIAP` | Sim |
| `TOKEN_EXPIRATION` | Tempo de expiração do token (ms) | `5184000000` | Não |
| `REFRESH_THRESHOLD` | Limite para refresh do token (ms) | `86400000` | Não |
| `ENABLE_LOGS` | Habilita logs detalhados no console | `true` | Não |
| `ENABLE_API_TESTS` | Habilita funções de teste da API | `true` | Não |
| `MOCK_API_RESPONSES` | Utiliza respostas mockadas para testes | `false` | Não |

#### ⚠️ Considerações de Segurança

- **Nunca** envie o arquivo `.env` para o repositório Git
- O arquivo `.env.example` serve como template e pode ser versionado
- Em produção, utilize variáveis de ambiente do serviço de hospedagem
- Mantenha a `JWT_SECRET` em segredo e utilize valores fortes

#### 🚀 Configurações para Diferentes Ambientes

**Desenvolvimento Local:**
```env
NODE_ENV=development
API_BASE_URL=http://localhost:8080
ENABLE_LOGS=true
ENABLE_API_TESTS=true
```

**Produção:**
```env
NODE_ENV=production
API_BASE_URL=https://sua-api-producao.com
ENABLE_LOGS=false
ENABLE_API_TESTS=false
```

**Staging/Testes:**
```env
NODE_ENV=staging
API_BASE_URL=https://api-staging.seuprojeto.com
MOCK_API_RESPONSES=true
ENABLE_LOGS=true
```

4. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
```

## 🔧 Configuração da API

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

### Configurações Adicionais

Para ambientes de produção ou serviços de hospedagem (como Expo EAS, Vercel, etc.), configure as variáveis de ambiente diretamente no painel do serviço:

**Exemplo para Expo EAS:**
```bash
eas build:configure --platform all
eas secret:create --scope project --name API_BASE_URL --value "https://sua-api.com"
eas secret:create --scope project --name JWT_SECRET --value "sua-chave-secreta"
```

**Variáveis recomendadas para produção:**
- `NODE_ENV=production`
- `ENABLE_LOGS=false`
- `ENABLE_API_TESTS=false`
- `MOCK_API_RESPONSES=false`

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





## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.


## 🔄 Changelog

### v4.0.0 - Atualização Expo SDK 54 (2025-11-07)
- ✅ Atualização da Expo SDK de 53.0.23 para 54.0.22
- ✅ Atualização do React de 19.0.0 para 19.1.0
- ✅ Atualização do React Native de 0.79.1 para 0.81.5
- ✅ Atualização do react-native-reanimated de 3.17.x para 4.1.1
- ✅ Instalação do react-native-worklets (peer dependency obrigatória)
- ✅ Todas as bibliotecas do Expo atualizadas para versões compatíveis com SDK 54
- ✅ Documentação atualizada com instruções de publish
- ⚠️ Última SDK com suporte à Legacy Architecture

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
