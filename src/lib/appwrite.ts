import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://leqalo.com/appwrite/v1')
  .setProject('ich-registry'); // Will be updated with actual project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = 'ich_db';

export const COLLECTIONS = {
  ICH_ELEMENTS: 'ich_elements',
  BEARERS: 'bearers',
  BEARER_ELEMENTS: 'bearer_elements',
  REGIONS: 'regions',
  UNESCO_DOMAINS: 'unesco_domains',
  NEWS: 'news',
} as const;

export const STORAGE_BUCKETS = {
  PHOTOS: 'photos',
  VIDEOS: 'videos',
  AUDIO: 'audio',
} as const;

export default client;
