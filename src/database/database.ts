import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { Cerveja } from '../cerveja/cerveja.entity';

@Injectable()
export class Database {
  public async getCervejas(): Promise<Cerveja[]> {
    const cervejasInfile = await readFile('cervejas.json', 'utf-8');
    const cervejas = JSON.parse(cervejasInfile);
    return cervejas;
  }
  public async gravarCerveja(cerveja: Cerveja) {
    let cervejas = await this.getCervejas();
    if (cervejas) {
      cervejas = [];
    }
    await writeFile(
      'cervejas.json',
      JSON.stringify([...(await this.getCervejas()), cerveja]),
    );
  }
  public async gravarCervejas(cervejas: Cerveja[]) {
    await writeFile('cervejas.json', JSON.stringify([cervejas]));
  }
}