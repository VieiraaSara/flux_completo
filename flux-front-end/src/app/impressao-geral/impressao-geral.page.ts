import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { jsPDF } from 'jspdf';
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

  constructor(private route: ActivatedRoute, public navCtrl: NavController) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['data']) {
        try {
          const parsedData = JSON.parse(params['data']);

          if (Array.isArray(parsedData)) {
            this.data = parsedData.map((item: any) => ({
              nome: item.nome,
              cpf: item.cpf,
              valor_disponivel: item.valor_disponivel,
              nome_instituicao_financeira: item.nome_instituicao_financeira,
              saldo_total_geral: item.saldo_total_geral,
            }));
            console.log('Dados recebidos PDF:', this.data);
          } else {
            console.error('Os dados recebidos não são um array.');
          }
        } catch (error) {
          console.error('Erro ao parsear os dados:', error);
        }
      }
    });
  }

  async shareExtrato($event: MouseEvent) {
    const extratoTexto = this.data.map(item => 
      `Nome: ${item.nome}\nCPF: ${item.cpf}\nValor Disponível: ${item.valor_disponivel}\nInstituição: ${item.nome_instituicao_financeira}\nSaldo Total: ${item.saldo_total_geral}\n`
    ).join('\n');

    await Share.share({
      title: 'Extrato Bancário',
      text: extratoTexto,
      dialogTitle: 'Compartilhar Extrato',
    });
  }

  async gerarPDF(event: MouseEvent) {
    const element = document.getElementById('pdfContent');
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;
    const imgWidth = pdfWidth * 0.8;
    const imgHeight = imgWidth / ratio;
    const totalPages = Math.ceil(imgHeight / pdfHeight);
    let position = 0;

    for (let i = 0; i < totalPages; i++) {
      const canvasFragment = document.createElement('canvas');
      const context = canvasFragment.getContext('2d');
      const fragmentHeight = Math.min(canvasHeight - position, canvasHeight / totalPages);

      canvasFragment.width = canvasWidth;
      canvasFragment.height = fragmentHeight;
      context?.drawImage(canvas, 0, position, canvasWidth, fragmentHeight, 0, 0, canvasWidth, fragmentHeight);

      const fragmentImgData = canvasFragment.toDataURL('image/png');
      pdf.addImage(fragmentImgData, 'PNG', 10, 10, imgWidth, (fragmentHeight / canvasHeight) * imgHeight);

      if (i < totalPages - 1) {
        pdf.addPage();
      }
      position += fragmentHeight;
    }

    pdf.save('extrato_banco_multipagina.pdf');
  }

  voltar($event: MouseEvent) {
    this.navCtrl.navigateBack('/tabs/impressao-extrato');
  }
}
