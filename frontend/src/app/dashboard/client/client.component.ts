import {Client, ClientService} from "../shared/service/client.services";
import {Component , ViewChild, ElementRef} from "@angular/core";
import { Alert } from '../shared/alert/alert-message.compenent'

@Component({
  templateUrl: 'client.component.html',
  providers: [ClientService]
})
export class ClientComponent {

  public maskCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public maskTelefone = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCelular = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  alert1 : Alert = new Alert();

  @ViewChild('alerta1') viewAlert1:ElementRef;

  AllClients: Client[];
  CurrentClient: Client = <Client>{address: {}};

  public textSearch: string;

  public isEdit: boolean = false;

  public ordination: string;
  public crecente: string = 'S';

  constructor(private clientService: ClientService) {
    this.AtualizaClientes();
   }

  private AtualizaClientes(){
    this.clientService.getClients().subscribe(p => this.AllClients = p);
  }

  public setOrdination(ordination:string) {
    if(ordination != this.ordination || !this.crecente) this.crecente = 'S';
    else this.crecente = 'N';
    this.ordination = ordination;
  }

  public visualizar(cli:Client){
    this.isEdit = true;

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
    this.show();
  }

  public novo(){
    this.isEdit = false;

    this.CurrentClient = <Client>{address: {}};
    this.show();
  }

  private show(){
    document.getElementById('show').click();
    this.alert1.isVisible = false;
  }

  private close(){
      document.getElementById('close').click();
  }

  public salvar(cli: Client){
    if (this.isEdit) {
      this.clientService.editar(cli).subscribe(() =>{
        this.AtualizaClientes();
        this.close();
        this.alert1.alertar("Cliente alterado com sucesso", false, ()=>{});
        this.viewAlert1.nativeElement.scrollIntoView();
      })
    } else {
      this.clientService.salvar(cli).subscribe(() =>{
        this.AtualizaClientes();
        this.close();
        this.alert1.alertar("Cliente salvo com sucesso", false, ()=>{});
        this.viewAlert1.nativeElement.scrollIntoView();
      })
    }

  }

}
