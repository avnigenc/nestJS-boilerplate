import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export default (app: INestApplication, configService: ConfigService): void => {
  const swaggerConfig = configService.get('SWAGGER_OPTIONS');
  const {
    title, description, version, contact,
  } = swaggerConfig;

  const swaggerBuilder = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .setContact(contact.name, contact.url, contact.email)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerBuilder);
  SwaggerModule.setup('documentation', app, document, {
    explorer: false,
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelsExpandDepth: -1,
    },
  });
};
