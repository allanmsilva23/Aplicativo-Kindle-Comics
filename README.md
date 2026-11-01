# 📚 Atividade Prática 10 - App Kindle Comics (React Native)

Este repositório contém a entrega da **Atividade Prática 10** desenvolvida para a disciplina de **Programação para Dispositivos Móveis II** do professor Jeferson de Souza Dias do curso de **Desenvolvimento de Software Multiplataforma** na **Fatec Itaquera**.

## 📌 Sobre o Projeto

O aplicativo é inspirado na interface principal do Amazon Kindle, adaptado para um tema personalizado de **Histórias em Quadrinhos (Marvel & DC)**. Ele simula a navegação por abas, exibição de biblioteca, gerenciamento de downloads/favoritos e uma interface de leitor (Guided View) interativa.

## 🎯 Requisitos da Atividade e Como Foram Aplicados

| Requisito Solicitado | Como foi implementado |
| :--- | :--- |
| **Fazer um clone do App Kindle** | A interface foi desenhada inspirada na UI oficial do Kindle, incluindo carrosséis horizontais, cards de leitura contínua e barra de navegação responsiva. |
| **Usar React Navigation** | Implementado o `@react-navigation/bottom-tabs` no `App.js` para criar a barra inferior, permitindo transitar fluidamente entre as telas, utilizando o `useSafeAreaInsets` para adaptação perfeita a qualquer aparelho. |
| **Usar ícones** | A biblioteca `@expo/vector-icons` foi amplamente utilizada (Ionicons e MaterialCommunityIcons) na barra de pesquisa, tabs inferiores, avaliações (estrelas) e botões de ação. |
| **Usar imagens de livros** | As capas de 8 quadrinhos reais foram importadas localmente para a pasta `src/assets/` e renderizadas otimizadas utilizando o componente `Image` do React Native. |
| **Criar algumas funcionalidades** | Foram implementados: sistema de busca em tempo real, alternância de Modo Escuro/Claro, filtros de biblioteca (Todas/Baixadas/Favoritas) e controles simulados de fonte no leitor. |
| **Criar Tela1.js, Tela2.js, Tela3.js** | A arquitetura obedeceu à regra de separar a lógica em arquivos independentes dentro da pasta `src/`, orquestrados pelo `App.js`, garantindo a pontuação total do layout. |
| **Escolha de Tema Específico** | O tema escolhido foi "Histórias em Quadrinhos" (Comics), refletido nos dados mockados (`HQS_DATA`), cores temáticas e textos descritivos das telas. |

---

## 🚀 Como Executar o Projeto

Você pode testar este projeto de duas maneiras: diretamente no navegador via Snack Expo (forma mais rápida) ou localmente na sua máquina.

### Opção 1: Pelo Snack Expo (Direto no Navegador)
1. Acesse o [Snack Expo](https://snack.expo.dev/).
2. No painel esquerdo de arquivos, crie a seguinte estrutura:
   - `App.js`
   - `src/Tela1.js`
   - `src/Tela2.js`
   - `src/Tela3.js`
   - `src/assets/` (Faça upload das 8 capas de HQ nesta pasta)
3. Copie e cole os respectivos códigos deste repositório em cada arquivo.
4. Selecione a aba **Web**, **iOS** ou **Android** no painel direito para visualizar e interagir com o aplicativo em tempo real.

### Opção 2: Localmente na sua Máquina
**Pré-requisitos:** Node.js instalado e o aplicativo *Expo Go* no seu dispositivo móvel (opcional).

1. Clone este repositório para a sua máquina:
   ```bash
   git clone https://github.com/allanmsilva23/Aplicativo-Kindle-Comics.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd Aplicativo-Kindle-Comics
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor do Expo:
   ```bash
   npx expo start
   ```
5. Escaneie o QR Code que aparecerá no terminal usando a câmera do seu celular (iOS) ou o app do Expo Go (Android).

---

## 🛠️ Tecnologias Utilizadas
*   **React Native**
*   **Expo (v54.0.0)**
*   **React Navigation (Bottom Tabs)**
*   **React Native Safe Area Context**
*   **JavaScript (ES6+)**