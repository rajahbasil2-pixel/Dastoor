interface WhatsAppOrderParams {
  productName: string;
  size: string;
  quantity: number;
  price: string;
}

export function buildWhatsAppOrderMessage(params: WhatsAppOrderParams): string {
  const { productName, size, quantity, price } = params;
  const message = `Hello Dastoor! 👋\n\nI'd like to order:\n\n*Product:* ${productName}\n*Size:* ${size}\n*Quantity:* ${quantity}\n*Price:* ${price}\n\nPlease confirm availability and delivery details. Thank you!`;
  return encodeURIComponent(message);
}

export function getWhatsAppLink(message: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";
  return `https://wa.me/${number}?text=${message}`;
}
