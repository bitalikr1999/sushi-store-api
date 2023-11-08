import * as dotenv from 'dotenv'
dotenv.config()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DomainExceptionsFilter } from './shared'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as basicAuth from 'express-basic-auth'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.use(cookieParser())
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: { excludeExtraneousValues: true },
		}),
	)

	app.enableCors({
		origin: '*',
	})

	app.use(
		'/docs',
		basicAuth({
			challenge: true,
			users: {
				admin: '1065473nbgl',
			},
		}),
	)

	const config = new DocumentBuilder()
		.setTitle('TaskMe Api')
		.setDescription('The TaskMe API description')
		.setVersion('1.0')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)

	app.useGlobalFilters(new DomainExceptionsFilter(new Logger()))

	await app.listen(3000)
}
bootstrap()
