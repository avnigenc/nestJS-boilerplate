export default () => ({
  NAME: 'nestjs-template',
  VERSION: process.env.VERSION || '0.0.1',
  JWT_SECRET: '',
  SWAGGER_OPTIONS: {
    title: 'NestJS Template',
    description: 'nestjs template',
    version: process.env.VERSION || '0.0.1',
    contact: {
      name: '',
      email: '',
      url: '',
    },
  },
});
