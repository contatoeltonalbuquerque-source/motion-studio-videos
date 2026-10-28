# Motion Studio Videos

Estúdio de criação de vídeos verticais programáticos com **Remotion + React**, organizado para edição no Windows e versionamento via GitHub.

> **Projeto demonstrativo:** todos os números e textos iniciais são fictícios. Não são dados eleitorais nem representam resultados reais.

## O que já está pronto

- Vídeo vertical **1080 × 1920**, **30 quadros por segundo** e **60 segundos**.
- Cinco cenas editáveis: abertura, pictogramas, barras comparativas, clipe opcional e encerramento.
- Contadores animados e ícones vetoriais; entradas suavizadas com spring.
- Espaço para inserir sua própria gravação ou narração, sem depender de serviço pago.
- Exportação local em MP4.

## 1. Instalação gratuita no Windows

1. Instale **Node.js LTS**: https://nodejs.org/pt-br/download
2. Instale **GitHub Desktop**: https://desktop.github.com/
3. Instale **Visual Studio Code**: https://code.visualstudio.com/
4. No GitHub Desktop, clique em **File > Clone repository** e escolha este repositório.
5. Em seguida, abra a pasta clonada no VS Code e abra **Terminal > New Terminal**.

Execute os comandos abaixo, um de cada vez:

~~~powershell
npm install
npm run dev
~~~

O **Remotion Studio** abrirá no navegador local, normalmente em http://localhost:3000, mostrando a composição **MotionStudio**.

**Importante:** se o PowerShell bloquear scripts de npm, use o terminal **Command Prompt** do VS Code (ícone de seta ao lado de + no Terminal) e repita os comandos. Não precisa alterar a política de segurança do Windows.

## 2. Como personalizar

Abra **src/config.ts** e mude:

- `titleLine1`, `titleLine2`, `titleLine3` e demais textos.
- `firstValue`, `secondValue`, `maxValue` para personalizar pictogramas e barras.
- `clipFile` para o nome de um vídeo colocado na pasta **public**, por exemplo `'meu-video.mp4'`.
- `voiceFile` para o nome de um áudio colocado na pasta **public**, por exemplo `'narracao.mp3'`.

Crie a pasta **public** caso ainda não exista. Não coloque arquivos pessoais em um repositório público. Se for privado, também não publique mídias sem permissão de uso.

O visual das cenas pode ser modificado em **src/Video.tsx**; os parâmetros de duração, proporção e FPS estão em **src/Root.tsx**.

## 3. Renderizar o MP4

~~~powershell
npm run render
~~~

O arquivo será criado em **out/motion-studio.mp4**. A pasta **out** não deve ser enviada ao GitHub.

## 4. Como continuar editando com o ChatGPT

Peça: “No meu repositório motion-studio-videos, altere a cena dos pictogramas para mostrar 100 pessoas com crescimento progressivo e transições suaves”.

Depois de aprovadas as mudanças no repositório, abra o GitHub Desktop e clique em **Fetch origin / Pull origin** para atualizar os arquivos locais; veja as mudanças no Remotion Studio.

## Limitações importantes

O GitHub guarda os arquivos, mas não é um editor ou serviço de renderização. As animações são feitas em código e pré-visualizadas no Remotion Studio. A gravação **realmente humana** da voz precisa ser fornecida pelo usuário. O projeto não converte automaticamente áudio em legendas, nem transforma vídeos existentes em motion graphics sem edição.

Veja também a documentação oficial: https://www.remotion.dev/docs/
