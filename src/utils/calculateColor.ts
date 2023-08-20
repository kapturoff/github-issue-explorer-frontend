import Color from 'colorjs.io';

/**
 * Calculates text color for a colorful background
 *
 * @param githubBgColor Github representaion of the color (rgb without "#" symbol)
 *
 * @returns Text color
 */
export default function calculateColor(githubBgColor: string) {
  const color = new Color(`#${githubBgColor}`);

  if (color.luminance < 0.5) {
    color.hsl.l = 98;
  } else {
    color.hsl.l = 7;
  }

  return color.toString();
}
