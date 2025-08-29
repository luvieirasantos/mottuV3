# Sistema de Autenticação - Mottu V3

## Visão Geral

O sistema de autenticação foi migrado de um sistema local (AsyncStorage) para uma API externa hospedada no Railway.

## Configuração da API

- **URL Base**: `https://api-mottu-sp3-java-production.up.railway.app`
- **JWT Secret**: `mottuSecretKey2024Sprint3JavaAdvancedFIAP`
- **Expiração do Token**: 2 meses (60 dias)

## Endpoints

### Cadastro
- **URL**: `POST /api/auth/cadastro`
- **Body**:
```json
{
  "nome": "Nome do Usuário",
  "email": "email@exemplo.com",
  "senha": "senha123"
}
```

### Login
- **URL**: `POST /api/auth/login`
- **Body**:
```json
{
  "email": "email@exemplo.com",
  "senha": "senha123"
}
```

## Formato da Resposta da API

### Resposta de Login/Cadastro
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "tipo": "Bearer",
  "nome": "Nome do Usuário",
  "email": "email@exemplo.com",
  "perfil": "USUARIO"
}
```

**Campos da Resposta:**
- `token`: JWT token para autenticação
- `tipo`: Tipo do token (sempre "Bearer")
- `nome`: Nome completo do usuário
- `email`: Email do usuário
- `perfil`: Perfil do usuário (ex: "USUARIO", "ADMIN")

## Estrutura de Arquivos

### Serviços
- `src/services/api.service.ts` - Serviço principal para comunicação com a API
- `src/services/auth.service.ts` - Serviço de autenticação atualizado

### Hooks
- `src/hooks/useAuth.ts` - Hook de autenticação principal
- `src/hooks/useApi.ts` - Hook para requisições autenticadas

### Tipos
- `src/types/api.types.ts` - Tipos específicos para a API
- `src/types/index.ts` - Tipos principais (inclui re-export da API)

### Utilitários
- `src/utils/api.constants.ts` - Constantes da API
- `src/utils/api.test.ts` - Funções de teste da API

## Como Usar

### Login
```typescript
import { useAuth } from '@/src/hooks/useAuth';

const { login } = useAuth();

try {
  const user = await login('email@exemplo.com', 'senha123');
  console.log('Usuário logado:', user);
} catch (error) {
  console.error('Erro no login:', error);
}
```

### Cadastro
```typescript
import { useAuth } from '@/src/hooks/useAuth';

const { register } = useAuth();

try {
  const user = await register('Nome do Usuário', 'email@exemplo.com', 'senha123');
  console.log('Usuário cadastrado:', user);
} catch (error) {
  console.error('Erro no cadastro:', error);
}
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

const data = await makeAuthenticatedRequest('/api/endpoint', {
  method: 'GET'
});
```

## Armazenamento Local

O sistema utiliza AsyncStorage para:
- Armazenar dados do usuário logado
- Armazenar o token JWT
- Persistir o estado de autenticação entre sessões

## Tratamento de Erros

- **401 Unauthorized**: Token inválido ou expirado
- **400 Bad Request**: Dados inválidos
- **500 Internal Server Error**: Erro interno da API

## Testes

Para testar a conectividade com a API:

```typescript
import { testApiConnection, testRegisterEndpoint, testApiResponseFormat } from '@/src/utils/api.test';

// Testar conectividade
const connectionTest = await testApiConnection();

// Testar endpoint de cadastro
const registerTest = await testRegisterEndpoint();

// Analisar formato da resposta
const formatTest = await testApiResponseFormat();
```

## Migração

O sistema foi projetado para ser compatível com a implementação anterior. As principais mudanças são:

1. **Autenticação**: Agora via API externa em vez de AsyncStorage local
2. **Token JWT**: Implementado para sessões seguras
3. **Validação de Token**: Verificação automática de validade
4. **Tratamento de Erros**: Melhor tratamento de erros de rede e API
5. **Formato da Resposta**: Adaptado para a estrutura real da API

## Segurança

- Tokens JWT com expiração de 2 meses
- Senhas não são armazenadas localmente
- Validação automática de tokens
- Logout automático em caso de token inválido
- Headers de autorização com Bearer token

## Mapeamento de Dados

### Da API para o App
```typescript
// Resposta da API
{
  token: "jwt_token",
  nome: "Nome do Usuário",
  email: "email@exemplo.com",
  perfil: "USUARIO"
}

// Mapeado para o App
{
  uid: "email@exemplo.com", // Usando email como UID
  email: "email@exemplo.com",
  displayName: "Nome do Usuário"
}
```

**Nota**: O UID está sendo mapeado do email temporariamente. Se a API retornar um ID único, esse mapeamento deve ser atualizado.
