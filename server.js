require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const API_VERSION = process.env.WHATSAPP_API_VERSION;

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

app.post("/webhook", async (req, res) => {
  // Responder rapidamente ao webhook da Meta.
  res.sendStatus(200);

  try {
    const entries = req.body.entry || [];
    for (const entry of entries) {
      for (const change of (entry.changes || [])) {
        const value = change.value || {};
        const messages = value.messages || [];

        for (const message of messages) {
          if (message.type !== "text" || !message.from) continue;

          const text = (message.text?.body || "").toLowerCase();
          const isConfirmation =
            text.includes("confirm") ||
            text.includes("presença") ||
            text.includes("presenca");

          if (!isConfirmation) continue;

          await sendThankYou(message.from);
        }
      }
    }
  } catch (error) {
    console.error("Erro ao processar webhook:", error.message);
  }
});

async function sendThankYou(to) {
  if (!ACCESS_TOKEN || !PHONE_NUMBER_ID || !API_VERSION) {
    throw new Error("Configure WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID e WHATSAPP_API_VERSION.");
  }

  const url = `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "text",
      text: {
        body: "Olá! ❤️💛 Sua confirmação foi recebida! Muito obrigado(a) por confirmar sua presença. Estamos preparando tudo com muito carinho e será uma alegria ter você comemorando esse dia especial conosco! 🎉"
      }
    })
  });

  const result = await response.json();
  if (!response.ok) {
    console.error("Falha ao enviar resposta pelo WhatsApp:", result);
  }
}

app.listen(PORT, () => {
  console.log(`Site disponível em http://localhost:${PORT}`);
});
