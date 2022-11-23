import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Cerveja } from './cerveja.entity';
import { CervejaService } from './cerveja.service';

@Controller('cervejas')
export class CervejaController {
  constructor(private service: CervejaService) {}

  @Post()
  public async criarCerveja(@Body() cerveja: Cerveja): Promise<NestResponse> {
    const cervejaCadastrada = await this.service.criarCerveja(cerveja);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/cervejas/${cervejaCadastrada.nome}` })
      .withBody(cervejaCadastrada)
      .build();
  }
}
