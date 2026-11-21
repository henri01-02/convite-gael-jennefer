# Convite digital — Gael & Jennefer

Site responsivo para o aniversário conjunto de Gael e Jennefer.

## Dados já configurados
- Data: 31 de janeiro de 2027
- Horário: 16h
- Local informado: Espaço Vale do Sol
- WhatsApp de confirmação: +55 82 98734-0994

## 1. Personalizar o site
- `index.html`: textos e estrutura do convite.
- `style.css`: cores, fontes, bordas e aparência.
- `script.js`: número do WhatsApp e mensagens dos botões.

O convite usa formas CSS originais (orelhas e laço) como referência temática. Não inclui imagens oficiais dos personagens.

## 2. Publicar apenas o site no GitHub Pages
1. Crie um repositório no GitHub.
2. Envie os arquivos deste projeto para a raiz do repositório.
3. Entre em **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/ (root)`, depois salve.

O site estático e os links para abrir o WhatsApp funcionarão no GitHub Pages.

## 3. Testar localmente
É possível abrir `index.html` diretamente no navegador para testar os botões.
Para testar o servidor Node:
1. Instale Node.js.
2. No terminal, entre na pasta do projeto.
3. Execute `npm install`.
4. Copie `.env.example` para `.env` e preencha as variáveis.
5. Execute `npm start`.
6. Abra `http://localhost:3000`.

## 4. Resposta automática do WhatsApp
O arquivo `server.js` contém um webhook para a WhatsApp Cloud API. Ele responde com agradecimento quando recebe uma mensagem de texto contendo "confirm", "presença" ou "presenca".

Para ativar de verdade:
1. Configure uma conta/app no Meta for Developers e habilite a WhatsApp Cloud API.
2. Configure um número de WhatsApp Business e obtenha o token de acesso e o Phone Number ID.
3. Hospede `server.js` em um serviço que execute Node.js e tenha HTTPS público. GitHub Pages não executa esse servidor.
4. Configure no painel da Meta a URL pública `https://SEU-DOMINIO/webhook` e o mesmo `WEBHOOK_VERIFY_TOKEN` do `.env`.
5. Assine o campo de webhook `messages`.
6. Preencha `WHATSAPP_API_VERSION` com uma versão Graph API atualmente suportada pela Meta.
7. Teste com uma mensagem real antes de divulgar o convite.

**Importante:** não coloque tokens, senhas ou o arquivo `.env` no GitHub. O token de acesso deve ficar apenas nas variáveis de ambiente do servidor. A Meta pode exigir configuração empresarial, revisão ou modelos de mensagem conforme o tipo de conversa e as regras vigentes.

## 5. Localização
O botão "Como chegar" pesquisa "Espaço Vale do Sol" no Google Maps. Como não foi informado endereço/cidade, confirme o local correto e atualize o link em `index.html` para evitar levar os convidados a um espaço homônimo.
