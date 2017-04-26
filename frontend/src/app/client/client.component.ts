import { ClientService, Client } from './../provider/client.services';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'client.component.html',
  providers: [ClientService]
})
export class ClientComponent {

  public maskCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public maskTelefone = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCelular = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  AllClients: Client[];
  CurrentClient: Client = <Client>{address: {}};
  regNovo: boolean;

  public void ordination: string;

  constructor(private clientService: ClientService) {
    this.AtualizaClientes();
   }

  private AtualizaClientes(){
    this.clientService.getClients().subscribe(p => this.AllClients = p);
  }

  public setOrdination(ordination:string) {
    this.ordination = ordination;
    console.log(ordination);
  }

  public visualizar(cli:Client){
    this.CurrentClient ={
      cpf: cli.cpf,
      name: cli.name,
      phone1: cli.phone1,
      phone2: cli.phone2,
      address:{
          place: cli.address.place,
          city: cli.address.city,
          zipCode: cli.address.zipCode,
          number: cli.address.number,
          neighborhood: cli.address.neighborhood,
          info: cli.address.info
      }
    };
    this.regNovo = false;
    this.show();
  }

  public Novo(){
    this.CurrentClient = <Client>{address: {}};
    this.regNovo = true;
    this.show();
  }

  private show(){
    document.getElementById('show').click();
  }

  private close(){
      document.getElementById('close').click();
  }

  public salvar(cli: Client){
    this.clientService.salvar(cli);
    this.AtualizaClientes();
    this.close();
  }

}
