module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1340),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'f8deb7dc1d95f4fd693b9abcfb711429'),
    },
  },
});
