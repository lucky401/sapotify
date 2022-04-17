import {get} from 'lodash';

/**
 * Get the value of a key in an object, or a default value if the key does not exist
 * @param obj - The object to search.
 * @param key - The key to get the value for.
 * @param defaultValue - The default value to return if the key is not found.
 * @returns The value of the key in the object.
 */
export const getValueByKey = (
  obj: Record<string, unknown>,
  key: string,
  defaultValue: any,
): any => {
  return get(obj, key, defaultValue);
};

/**
 * Generate a random string of a given length
 * @param length - The length of the string to be generated.
 * @returns A random string of length `length`
 */
export const generateRandomString = (length: number): string => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
