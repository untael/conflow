module.exports = ({ env }) => ({
  host: env('HOST', process.env.HOST),
  port: env.int('PORT', process.env.PORT),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'de06625e9c9810d7b84ac324b959da6b'),
    },
  },
});
