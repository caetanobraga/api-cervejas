import fs from 'fs';
import { Cerveja } from 'src/cerveja/cerveja.entity';

export class Database {
  public getCervejas(): Cerveja[] {
    const cervejasInfile = fs.readFileSync('cervejas.json').toString();
    const cervejas = JSON.parse(cervejasInfile);
    return cervejas;
  }
  public gravarCerveja(cerveja: Cerveja) {
    fs.writeFileSync(
      'cervejas.json',
      JSON.stringify([...this.getCervejas(), cerveja]),
    );
  }
  public gravarCervejas(cervejas: Cerveja[]) {
    fs.writeFileSync('cervejas.json', JSON.stringify([cervejas]));
  }
}
