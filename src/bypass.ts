import AESJS from 'aes-js';
const { ModeOfOperation: AesModes, utils: AesUtils } = AESJS;
import undici from 'undici';
import { ReactLabBypassError } from './errors';

export interface IResolveCookieResult {
  cookie: string;
  cookieName: string;
  cookieValue: string;
  cookieInfo?: string;
}

export const resolveCookie = (html: string): IResolveCookieResult => {
  
  const page = html.replace(/\\x([A-F0-9]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  const keys = page.match(/[a-f0-9]{32}/g);
  if (!keys) throw new ReactLabBypassError('Cannot get keys from HTML');
  
  const [ key, iv, cipher ] = keys.map(AesUtils.hex.toBytes);
  const cookieName = page
    .match(/[a-z0-9]{32}","cookie","(?<name>[^"=]+)/i)
    ?.groups
    ?.name;
  const cookieValue = AesUtils.hex.fromBytes(new AesModes.cbc(key, iv).decrypt(cipher));
  const cookieInfo = page
    .match(/(?<info>expires=[^"]+)/i)
    ?.groups
    ?.info;
    
  if (!cookieName) throw new ReactLabBypassError('Cannot get cookieName');

  return {
    cookie: `${cookieName}=${cookieValue}${cookieInfo ? '; ' + cookieInfo : ';'}`,
    cookieName,
    cookieValue,
    cookieInfo
  };

};

export interface IReactLabBypassOptions {
  host: string;
  headers?: Record<string, string>;
}
export const reactLabBypass = async ({
  host,
  headers = {}
}: IReactLabBypassOptions) => {
  const url = new URL('/', host);
  const response = await undici.request(url, { headers });
  const content = await response.body.text();
  const cookie = resolveCookie(content);
  return cookie;
};