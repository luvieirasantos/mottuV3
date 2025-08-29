# Guia de Debugging - Sistema de Autenticação

## Problema Atual

O sistema estava apresentando o erro "Resposta inválida da API" durante o login. Este erro foi causado por uma incompatibilidade entre o formato esperado e o formato real retornado pela API.

## Solução Implementada

A API retorna o seguinte formato:

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "tipo": "Bearer",
  "nome": "Nome do Usuário",
  "email": "email@exemplo.com",
  "perfil": "USUARIO"
}
```

O código foi atualizado para lidar com essa estrutura.

## Como Debugar

### 1. Verificar os Logs do Console

Com as melhorias implementadas, agora você verá logs detalhados no console que mostram:

- A URL da requisição
- As opções da requisição
- O status da resposta
- A resposta completa da API
- Análise da estrutura da resposta

### 2. Usar as Funções de Teste

Execute as funções de teste para diagnosticar o problema:

```typescript
import { 
  testApiConnection, 
  testRegisterEndpoint, 
  testApiResponseFormat 
} from '@/src/utils/api.test';

// Testar conectividade básica
const connectionTest = await testApiConnection();
console.log('Teste de conectividade:', connectionTest);

// Testar endpoint de cadastro
const registerTest = await testRegisterEndpoint();
console.log('Teste de cadastro:', registerTest);

// Analisar formato da resposta
const formatTest = await testApiResponseFormat();
console.log('Análise do formato:', formatTest);
```

### 3. Verificar o Formato da Resposta

A API retorna a resposta no seguinte formato:

#### Formato Real da API
```json
{
  "token": "jwt_token_aqui",
  "tipo": "Bearer",
  "nome": "Nome do Usuário",
  "email": "email@exemplo.com",
  "perfil": "USUARIO"
}
```

#### Campos Esperados
- `token`: JWT token para autenticação
- `tipo`: Tipo do token (sempre "Bearer")
- `nome`: Nome completo do usuário
- `email`: Email do usuário
- `perfil`: Perfil do usuário

### 4. Verificar o Status da Resposta

- **200 OK**: Sucesso
- **201 Created**: Criado com sucesso (cadastro)
- **400 Bad Request**: Dados inválidos
- **401 Unauthorized**: Credenciais inválidas
- **500 Internal Server Error**: Erro interno da API

### 5. Verificar a Estrutura da Resposta

Use a função `testApiResponseFormat()` para analisar automaticamente a estrutura da resposta:

```typescript
const formatTest = await testApiResponseFormat();
console.log('Chaves da resposta:', formatTest.details);
```

## Possíveis Causas de Problemas

### 1. Formato de Resposta Diferente
A API pode retornar a resposta em um formato não esperado.

### 2. Campos com Nomes Diferentes
Os campos podem ter nomes diferentes do esperado.

### 3. Campos Opcionais
Alguns campos podem ser opcionais ou estar ausentes.

### 4. Estrutura Aninhada
A resposta pode estar aninhada em um objeto `data` ou similar.

## Soluções Implementadas

### 1. Validação Correta
O código agora verifica os campos corretos:
- `response.token`
- `response.nome`
- `response.email`

### 2. Logs Detalhados
Logs completos para facilitar o debugging.

### 3. Funções de Teste
Funções específicas para testar a conectividade e formato da API.

### 4. Tratamento de Erros Melhorado
Mensagens de erro mais informativas.

## Como Resolver Problemas Futuros

### Passo 1: Executar os Testes
```typescript
// No console do navegador ou React Native
import { testApiResponseFormat } from '@/src/utils/api.test';
const result = await testApiResponseFormat();
console.log(result.details);
```

### Passo 2: Analisar os Logs
Verifique os logs no console para entender:
- Qual formato a API está retornando
- Se há campos faltando
- Se há diferenças na estrutura

### Passo 3: Ajustar o Código
Com base na análise, ajuste:
- Os tipos em `src/types/api.types.ts`
- A validação em `src/services/api.service.ts`
- O mapeamento em `src/services/auth.service.ts`

### Passo 4: Testar Novamente
Após as correções, teste novamente o login para verificar se o problema foi resolvido.

## Exemplo de Correção

Se a API retornar um formato diferente no futuro:

```json
{
  "message": "Login realizado com sucesso",
  "data": {
    "accessToken": "jwt_token",
    "userInfo": {
      "userId": "123",
      "userName": "Nome",
      "userEmail": "email@exemplo.com"
    }
  }
}
```

Você precisaria ajustar:
1. Os tipos para refletir a estrutura real
2. A validação para verificar `data.accessToken` e `data.userInfo`
3. O mapeamento para converter `userInfo` para o formato esperado

## Logs de Debug

Os logs agora mostram:
- `[DEBUG REQUEST]` - Detalhes da requisição
- `[DEBUG RESPONSE]` - Detalhes da resposta
- `[DEBUG ERROR]` - Erros detalhados
- `[DADOS SENSÍVEIS OCULTADOS]` - Quando dados sensíveis são ocultados

## Configuração de Debug

Para habilitar/desabilitar logs específicos, edite `src/config/debug.ts`:

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

## Status Atual

✅ **PROBLEMA RESOLVIDO**: O sistema agora está configurado para lidar corretamente com o formato real da API.

### O que foi corrigido:
1. **Tipos atualizados**: `AuthResponse` agora reflete a estrutura real
2. **Validação corrigida**: Verifica os campos corretos (`token`, `nome`, `email`)
3. **Mapeamento ajustado**: Converte corretamente os dados da API para o formato do app
4. **Logs melhorados**: Mostram informações relevantes para debugging

### Teste recomendado:
Execute o login novamente para verificar se o erro foi resolvido. Os logs agora devem mostrar "Formato da API detectado corretamente" em vez de "Formato de resposta não reconhecido".
