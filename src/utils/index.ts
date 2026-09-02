// ═══════════════════════════════════════════════════════════════
// SHOP MARTINS — Utility Functions
// ═══════════════════════════════════════════════════════════════

export function formatPrice(value: number): string {
  const valueReais = value / 100
  return valueReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatViews(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace('.0', '')}k`;
  }
  return String(count);
}

export function getWhatsAppLink(numero: string, mensagem: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function ensureExternalLink(url: string | null | undefined): string {
  if (!url) return '#';
  const trimmed = url.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:')
  ) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function formatCurrencyInput(value: string | number): string {
  const onlyDigits = String(value).replace(/\D/g, '');
  if (!onlyDigits) return '';
  const cents = parseInt(onlyDigits, 10);
  if (isNaN(cents)) return '';
  return (cents / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function parseCurrencyToCents(value: string): number {
  let limpo = value.replace(/\./g, '');
  limpo = limpo.replace(',', '.');
  limpo = limpo.replace(/[^\d.]/g, '');
  const floatVal = parseFloat(limpo);
  if (isNaN(floatVal)) return 0;
  return Math.round(floatVal * 100);
}

export function getAvatarUrl(path: string | null | undefined, seedName?: string): string | null {
  if (!path) return null;
  if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:')) return path;

  // If not a full URL, treat as a storage key and resolve through CDN
  const cdnUrl = process.env.NEXT_PUBLIC_MEDIA_CDN_URL!;
  const cleanCdn = cdnUrl.replace(/\/+$/, '');
  const cleanPath = path.replace(/^\/+/, '');
  return `${cleanCdn}/${cleanPath}`;
}

