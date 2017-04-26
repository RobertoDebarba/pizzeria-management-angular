import { Component } from '@angular/core';

@Component({
  templateUrl: 'client.component.html'
})
export class ClientComponent {

  public maskCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public maskTelefone = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCelular = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  public name: string;
  public cpf: string;
  public telefone: string;
  public celular: string;
  public  rua: string;
  public numero: number;
  public bairro: string;
  public cidade: string;
  public cep: string;
  public complemento: string;

  constructor( ) { }

}
