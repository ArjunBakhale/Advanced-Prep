export function remToPx(remValue: number): number {
  let rootFontSize: number =
    typeof window === 'undefined'
      ? 16
      : parseFloat(window.getComputedStyle(document.documentElement).fontSize);

  return remValue * rootFontSize;
}