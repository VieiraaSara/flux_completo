import { Component, OnInit } from '@angular/core';
import {  HostListener,  } from '@angular/core';
import { CarteiraService } from '../services/carteira.service';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { ContaBancariaService } from '../services/conta-bancaria.service';
import { ExtratoService } from '../services/extrato.service';

@Component({
  selector: 'app-impressao-extrato',
  templateUrl: './impressao-extrato.page.html',
  styleUrls: ['./impressao-extrato.page.scss'],
})
export class ImpressaoExtratoPage implements OnInit {


  listContas: any[] = [];
  id_conta: any;
  id: any;
  banco_id: any;
  saldo: any;
  tipo_conta:any;
  image: any;
  nome_instituicao:any;
  constructor(
    private contaBancariaService: ContaBancariaService,
    private extratoService: ExtratoService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.decodeToken();

    const token = localStorage.getItem('token');
    if (token) {
      this.contaBancariaService.getContasBancariasList(token).subscribe(
        async (data) => {
          if (data && Array.isArray(data)) {


            // pegando valores da requisição
            this.listContas = data.map((item: any) => ({
              id_conta: item.id_conta,
              banco_id: item.banco_id,
              saldo: item.saldo,
              tipo_conta: item.tipo_conta,
              nome_instituicao: item.Banco.name,
              image: item.Banco.image,
              detailsVisible: false,
            }));
          } else {
            console.error('Dados inválidos retornados da API:', data);
          }
        },
        (error) => {
          console.error('Erro ao buscar dados da API', error);
        }
      );
    } else {
      console.error('Token não encontrado.');
    }
    console.log(this.listContas);
  }


  decodeToken() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const tokenPayload: any = jwtDecode(token);

        if (tokenPayload && tokenPayload.id) {
          this.id = tokenPayload.id;
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }

 async imprimirExtratoGeral($event: any) {
    console.log('Imprimindo extrato');
    const token = localStorage.getItem('token');

    if(token && this.id){
      try {

        this.extratoService.getExtratoGeral(token).subscribe(response => {
          console.log('Dados recebidos do serviço:', response);


          this.navCtrl.navigateForward('/impressao-geral', {
            queryParams: { data: JSON.stringify(Array.isArray(response) ? response : [response]) }
          });

        }, error => {
          console.error('Erro ao obter extrato:', error);
        });

      } catch (error) {
        console.error('Erro ao gerar impressão de extrato', error);
      }
    }

  }

  imprimirExtratoContaBancaria(contaBancariaID: any) {
    console.log(contaBancariaID);
    // aqui tem que levar o usuário para imprimir o extrato de sua conta bancaria
  }

  }


