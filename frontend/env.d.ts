
declare namespace NodeJS {
    interface ProcessEnv {
        readonly NEXT_PUBLIC_STRAPI_URL: string;
        readonly NODE_ENV: 'development' | 'production' | 'test';
    }
}