import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientContactEntity } from './entities/client-contact.entity';
import { ClientContactService } from './services/client-contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientContactEntity])],
  providers: [ClientContactService],
  exports: [TypeOrmModule, ClientContactService],
})
export class ClientContactModule {}
