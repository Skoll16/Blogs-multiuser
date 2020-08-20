import getConfig from "next/config";
// getConfig is used to get config variable

//  har baar publicRuntimeConfig.development voh sab na krne ke liye humne config.js bnaya hai for easier access
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.API_PRODUCTION
  : publicRuntimeConfig.API_DEVELOPMENT;
export const APP_NAME = publicRuntimeConfig.APP_NAME;
 
export const DOMAIN = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.DOMAIN_PRODUCTION
  : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const FB_APP_ID=publicRuntimeConfig.FB_APP_ID

export const DISQUS_SHORTNAME=publicRuntimeConfig.DISQUS_SHORTNAME;
export const GOOGLE_CLIENT_ID=publicRuntimeConfig.GOOGLE_CLIENT_ID;