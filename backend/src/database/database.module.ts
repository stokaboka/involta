import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {DataSourceOptions} from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('POSTGRES_HOST'),
                port: configService.get<number>('POSTGRES_PORT'),
                username: configService.get<string>('POSTGRES_USER'),
                password: configService.get<string>('POSTGRES_PASSWORD'),
                database: configService.get<string>('POSTGRES_DB'),
                entities: [
                    __dirname + '/../**/*.entity.ts',
                ],
                synchronize: true,
                autoLoadEntities: true,
                migrationsRun: true,
                logging: true,
                logger: 'file',
                migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
                cli: {
                    migrationsDir: 'src/migrations',
                }
            } as DataSourceOptions)
        })
    ]
})
export class DatabaseModule {}
