import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { jsPDF } from "jspdf";
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
  
    // Gerar o canvas a partir do conteúdo HTML
    const canvas = await html2canvas(element, { scale: 2 });
  
    // Obter os dados da imagem como base64
    const imgData = canvas.toDataURL('image/png');
  
    // Definir o PDF no formato A4
    const pdf = new jsPDF('p', 'mm', 'a4'); // Formato A4
    const pdfWidth = pdf.internal.pageSize.getWidth(); // Largura A4 = 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // Altura A4 = 297mm
  
    // Dimensões do canvas (em pixels)
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
  
    // Proporção da imagem
    const ratio = canvasWidth / canvasHeight;
  
    // Ajuste o tamanho da imagem no PDF (menor do que o PDFWidth original)
    const imgWidth = pdfWidth * 0.8; // 80% da largura do PDF
    const imgHeight = imgWidth / ratio; // Altura proporcional
  
    // Quantidade de páginas necessárias
    const totalPages = Math.ceil(imgHeight / pdfHeight);
  
    // Para cada página, recorte uma parte da imagem e adicione no PDF
    let position = 0;
    for (let i = 0; i < totalPages; i++) {
      const canvasFragment = document.createElement('canvas');
      const context = canvasFragment.getContext('2d');
      const fragmentHeight = Math.min(canvasHeight - position, canvasHeight / totalPages);
  
      // Ajustar o fragmento do canvas
      canvasFragment.width = canvasWidth;
      canvasFragment.height = fragmentHeight;
      context?.drawImage(canvas, 0, position, canvasWidth, fragmentHeight, 0, 0, canvasWidth, fragmentHeight);
  
      const fragmentImgData = canvasFragment.toDataURL('image/png');
      
      // Adicionar a imagem fragmentada no PDF com tamanho menor
      pdf.addImage(fragmentImgData, 'PNG', 10, 10, imgWidth, (fragmentHeight / canvasHeight) * imgHeight);
  
      // Se não for a última página, adicionar uma nova página no PDF
      if (i < totalPages - 1) {
        pdf.addPage();
      }
      position += fragmentHeight;
    }
  
    // Salvar o PDF
    pdf.save('extrato_banco_multipagina.pdf');
  }
  
  
  
  
  saveByteArray(reportName: string, byte: Uint8Array) {
    const blob = new Blob([byte], { type: "application/pdf" });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = reportName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  voltar($event: MouseEvent) {
    this.navCtrl.navigateBack('/tabs/impressao-extrato');
  }
}
