import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelModule } from './model/model.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [ModelModule, InfrastructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
