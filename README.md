# Mottu - Pátio Digital

Sistema de trilateração BLE para monitoramento de motos em pátio industrial usando React Native + Expo + TypeScript.

## 🚀 Proposta e Funcionalidades

O **Mottu - Pátio Digital** é um aplicativo mobile que simula um sistema de trilateração baseado em BLE (Bluetooth Low Energy) para rastreamento preciso de motos em um pátio industrial.

### Principais Funcionalidades:
- **Sistema de Login/Cadastro** com Firebase Auth
- **Mapa interativo SVG** do pátio com trilateração em tempo real  
- **Simulação BLE** com diferentes topologias de âncoras
- **CRUD completo** de motos com integração API
- **Métricas de precisão** (P50, P90, Eficácia)
- **Análise de custos** por topologia
- **Tema claro/escuro** com identidade visual DARK + VERDE
- **Interface mobile-first** responsiva

## 🎨 Identidade Visual

- **Paleta principal**: DARK + VERDE (sem azul)
- **Background**: `#0b0e10`, `#0f1411`, `#121614`
- **Verde primário**: `#00C851` 
- **Amarelo**: `#FFD166` (posições estimadas)
- **Vermelho**: `#FF5C5C` (âncoras/alertas)
- **Material Design 3** com tema escuro por padrão

## 🏗️ Stack Tecnológica

- **React Native** com **Expo SDK 53**
- **TypeScript** para tipagem estática
- **React Navigation** para navegação
- **React Native Paper** (Material Design 3)
- **React Hook Form + Zod** para formulários
- **TanStack React Query** para gerenciamento de estado
- **Firebase** para autenticação
- **React Native SVG** para renderização do mapa
- **AsyncStorage** para persistência local

## 📁 Estrutura de Pastas

```
/src
├── /app                 # Navegação (stacks/tabs)
├── /components          # Componentes reutilizáveis
│   ├── YardMap.tsx      # Mapa SVG do pátio
│   ├── MetricsCard.tsx  # Métricas P50/P90
│   ├── MotoForm.tsx     # Formulário de motos
│   └── ...
├── /services            # Serviços API
├── /hooks               # Hooks customizados
│   ├── useAuth.ts       # Autenticação
│   ├── useBLESim.ts     # Simulação BLE
│   └── useThemeScheme.ts # Tema claro/escuro
├── /theme               # Temas Material Design
├── /utils               # Utilitários e validações
└── /types               # Interfaces TypeScript
```

## 🔧 Configuração

### Pré-requisitos
- Node.js 18+
- Expo CLI
- Android Studio (para build Android)

### Instalação
```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev

# Build para Android
npx expo prebuild -p android
npx expo run:android

# Ou abrir no Android Studio
npx expo prebuild -p android
# Abrir pasta /android no Android Studio
```

### Firebase (Autenticação)
1. Criar projeto no [Firebase Console](https://console.firebase.google.com)
2. Ativar Authentication com Email/Password
3. Obter configuração do projeto
4. Atualizar `src/services/firebase.ts` com suas credenciais:

```typescript
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com", 
  projectId: "seu-projeto-id",
  // ... outras configurações
};
```

### API Base URL
Para desenvolvimento, configure o endpoint da API em `src/utils/platform.ts`:

```typescript
export const API_BASE = Platform.OS === 'android' 
  ? 'http://10.0.2.2:8080/api'  // Android Emulator
  : 'http://localhost:8080/api'; // iOS Simulator/Web
```

## 🎯 Funcionalidades Principais

### 1. Sistema de Trilateração BLE
- **3 topologias** pré-configuradas (A, B, C)
- **Simulação RSSI** com ruído gaussiano
- **Algoritmo de mínimos quadrados** para trilateração
- **Suavização EMA** (α=0.25) para estabilizar posições
- **Métricas em tempo real** P50, P90, Eficácia

### 2. Mapa Interativo
- **SVG responsivo** com clipping e escala automática
- **Cobertura BLE** visível (círculos concêntricos)
- **Grade de zonas** (A1-D2) configurável
- **Legenda integrada** com identificação visual
- **Âncoras** (parede/chão) e **motos** (real/estimada)

### 3. CRUD de Motos
- **Listagem** com status e métricas
- **Criação/edição** com validação (RHF + Zod)
- **Posicionamento por zona** ou coordenadas
- **Movimento aleatório** (jitter) para simulação
- **Integração com API** (loaders, tratamento de erros)

### 4. Configurações Avançadas
- **Parâmetros BLE** ajustáveis (TxPower, PathLoss, Sigma)
- **Topologia padrão** selecionável  
- **Tema claro/escuro** persistido
- **Dimensões do pátio** configuráveis

## 📱 Scripts

```bash
# Desenvolvimento
npm run dev                    # Expo start
npm run lint                   # ESLint

# Build Android
npx expo prebuild -p android   # Gerar pasta /android
npx expo run:android           # Build e instalar no device

# Android Studio
# Abrir pasta /android no Android Studio
# Build > Make Project
# Run > Run 'app'
```

## 👥 Equipe

- **Nome**: [Seu Nome]
- **RM**: [Seu RM] 
- **GitHub**: [seu-usuario]

## 🎥 Demonstração

[Link do vídeo de apresentação - YouTube/Drive]

### Checklist da Apresentação:
- ✅ Login/Cadastro/Logout funcionais
- ✅ Navegação por todas as telas (tabs)
- ✅ Mapa com trilateração em tempo real
- ✅ Toggles de grade/cobertura BLE 
- ✅ CRUD de motos com validação
- ✅ Histórico e métricas atualizando
- ✅ Configurações (tema, parâmetros BLE)
- ✅ Relatórios e análises
- ✅ Build Android Studio

## 🔒 Critérios de Qualidade

- **Mobile-first** responsivo (360-414px)
- **Sem overflow** horizontal
- **Tema consistente** (DARK + VERDE)  
- **Formulários validados** (RHF + Zod)
- **Loaders e tratamento** de erros
- **Arquitetura modular** bem organizada
- **Zero links/botões** "mortos"
- **Compatível Android Studio**

## 📋 Notas Técnicas

### Trilateração
- **Modelo**: `RSSI = TxPower - 10*n*log10(d) + N(0,σ²)`
- **Inversão**: `d = 10^((TxPower-RSSI)/(10*n))`
- **Algoritmo**: Mínimos quadrados com ≥3 âncoras
- **Suavização**: EMA para estabilizar ruído

### Performance
- **Tick rate**: 650ms (configurable)
- **Janela métricas**: 300 amostras
- **Clipping SVG** para otimização
- **React Query** para cache inteligente

### Custos (simulados)
- **Âncora**: R$ 180
- **Agregador**: R$ 220  
- **Beacon/moto**: R$ 80

---

**Mottu - Pátio Digital** © 2024