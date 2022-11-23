import { ConflictException, Injectable } from '@nestjs/common';
import { Database } from 'src/database/database';
import { Cerveja } from './cerveja.entity';

@Injectable()
export class CervejaService {
  constructor(private database: Database) {}

  public async criarCerveja(cerveja: Cerveja): Promise<Cerveja> {
    const cervejaExiste = await this.buscaCervejaPeloNome(cerveja.nome);
    if (cervejaExiste) {
      throw new ConflictException({
        statusCode: 409,
        message: 'Cerveja já existe',
      });
    }
    await this.database.gravarCerveja(cerveja);
    return cerveja;
  }

  public async buscaCervejaPeloNome(nome: string) {
    const cervejas = await this.database.getCervejas();
    return cervejas.find(
      (cerveja) =>
        cerveja.nome.toLocaleLowerCase() === nome.toLocaleLowerCase(),
    );
  }

  public async buscaPaginadaDeCervejas(page, size) {
    const initialIndex = page * size;
    console.log('page', page);
    console.log('inicial', initialIndex);
    const finalIndex = initialIndex + parseInt(size);
    console.log('final', finalIndex);
    const cervejas = await this.database.getCervejas();
    if (cervejas.length > initialIndex) {
      if (cervejas.length > finalIndex) {
        return cervejas.slice(initialIndex, finalIndex);
      } else {
        return cervejas.slice(initialIndex, cervejas.length);
      }
    } else {
      return [];
    }
  }
}
