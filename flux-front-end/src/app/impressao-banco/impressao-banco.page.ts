import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { jsPDF } from "jspdf";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-impressao-banco',
  templateUrl: './impressao-banco.page.html',
  styleUrls: ['./impressao-banco.page.scss'],
})
export class ImpressaoBancoPage implements OnInit {
  data: any[] = [];
  nome:any ;
  cpf: any;
  key:any ;
  nome_instituicao_financeira:any ;
  data_transacao: any;
  descricao:any ;
  valor:any ;
  saldo_total_geral: any;
  saidas: any;
  entradas: any;


  constructor(private route: ActivatedRoute, public navCtrl: NavController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['data']) {
        try {
          const parsedData = JSON.parse(params['data']);

          // Verifique se parsedData é um array
          if (Array.isArray(parsedData)) {
            this.data = parsedData.map((item: any) => ({
              nome:item.nome ,
              cpf:item. cpf,
              key:item.key ,
              nome_instituicao_financeira:item.nome_instituicao_financeira ,
              data_transacao:item. data_transacao,
              descricao:item.descricao ,
              valor:item.valor ,
              saldo_total_geral:item. saldo_total_geral,
              saidas:item. saidas,
              entradas:item. entradas,

            }));
            console.log('Dados recebidosPDF:', this.data);
          } else {
            console.error('Os dados recebidos não são um array.');
          }
        } catch (error) {
          console.error('Erro ao parsear os dados:', error);
        }
      }
    });



  }
  async share($event: MouseEvent) {

    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }


  async gerarPDF(event: MouseEvent) {

    const element = document.getElementById('pdfContent');
    if (!element) return;


    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');


    const pdf = new jsPDF('p', 'cm', [10, 90]); 


    const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();


  const contentHeight = canvas.height / 60 * 1.15;
  const pageHeight = pdfHeight;
  let position = 0;

  console.log('pdfHeight: ', pdfHeight);
  console.log('pdfWidth: ', pdfWidth);
  console.log('contentHeight: ', contentHeight);


  while (position < contentHeight) {
    const remainingHeight = contentHeight - position;


    pdf.addImage(imgData, 'PNG', 0, -position, pdfWidth, contentHeight);


    if (remainingHeight > pageHeight) {
      pdf.addPage();
      position += pageHeight;
    } else {
      break;
    }
  }


  const pdfSaved = pdf.save('extrato_geral.pdf');
  return pdfSaved;
  }

  saveByteArray(reportName: string, byte: Uint8Array) {
    const blob = new Blob([byte], { type: "application/pdf" });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = reportName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  voltar($event: MouseEvent){
    this.navCtrl.navigateBack('/tabs/impressao-extrato');
  }
}

