import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { jsPDF } from "jspdf";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-impressao-geral',
  templateUrl: './impressao-geral.page.html',
  styleUrls: ['./impressao-geral.page.scss'],
})
export class ImpressaoGeralPage implements OnInit {


  data: any[] = [];
  nome: any;
  cpf: any;
  valor_disponivel: any;
  nome_instituicao_financeira: any;
  saldo_total_geral: any;

  constructor(private route: ActivatedRoute, public navCtrl: NavController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['data']) {
        try {
          const parsedData = JSON.parse(params['data']);

          // Verifique se parsedData é um array
          if (Array.isArray(parsedData)) {
            this.data = parsedData.map((item: any) => ({
              nome: item.nome,
              cpf: item.cpf,
              valor_disponivel: item.valor_disponivel,
              nome_instituicao_financeira: item.nome_instituicao_financeira,
              saldo_total_geral: item.saldo_total_geral
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


    const canvas = await html2canvas(element, { scale: 4});
    const imgData = canvas.toDataURL('image/png');

    // Criar um novo PDF com jsPDF
    const pdf = new jsPDF('p', 'mm', 'a6');


    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();


    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);


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
}
