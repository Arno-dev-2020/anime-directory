export const truncateText = (text: string, maxLength: number = 200): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}; 