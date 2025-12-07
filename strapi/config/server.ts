export default ({ env }) => ({
  host: env('HOST', process.env.HOST || '0.0.0.0'),
  port: env.int('PORT', process.env.PORT || 1337),
  url: env('PUBLIC_HOST', process.env.PUBLIC_HOST || '0.0.0.0'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  server: {
     allowedHosts: ['.'],
  },
});