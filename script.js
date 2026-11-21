// Número no formato internacional: 55 + DDD + número, sem espaços.
const WHATSAPP_NUMBER = "5582987340994";

const confirmationMessage =
  "Olá! Gostaria de confirmar minha presença no aniversário do Gael e da Jennefer, no dia 31/01/2027, às 15h. ❤️💛";

const giftsMessage =
  "Olá! Gostaria de saber as sugestões de presentes para Gael e Jennefer. ❤️💛";

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.getElementById("confirm-link").href = whatsappLink(confirmationMessage);
document.getElementById("gift-link").href = whatsappLink(giftsMessage);
