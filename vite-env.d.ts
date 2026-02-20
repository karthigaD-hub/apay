/// <reference types="vite/client" />

// optionally, if you want to be explicit about which vars you expect:
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // add other VITE_… keys here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}