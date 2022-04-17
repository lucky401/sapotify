const baseStyles = ['color: #fff', 'padding: 2px 4px', 'border-radius: 2px'];

type styles = {
  [key: string]: string[];
};

const styles: styles = {
  success: [...baseStyles, 'background-color: green'],
  warning: [...baseStyles, 'background-color: orange'],
  danger: [...baseStyles, 'background-color: red'],
  info: [...baseStyles, 'background-color: blue'],
};

/**
 * @description Given a modifier and a string, return the string wrapped in the appropriate style
 * @param string - The string to be colored.
 * @param modifier - The style to apply to the string.
 * @returns The string "Hello, World!"
 */
export function log(string: string, modifier = 'info'): void {
  // eslint-disable-next-line no-console
  console.log(`%c${string}`, styles[modifier].join(';'));
}
