import { Module } from '@nestjs/common';

import { SharedModule } from '@shared/shared.module';

import { APP_MODULES } from './modules';

@Module({
  imports: [
    SharedModule.share(),
    ...APP_MODULES
  ],
})
export class AppModule {}
