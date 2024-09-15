import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-flux',
  templateUrl: './config-flux.page.html',
  styleUrls: ['./config-flux.page.scss'],
})
export class ConfigFluxPage implements OnInit {
  user = {
    nome: '',
    email: '',
    username: '',
    password: '',
    securityQuestion: '',
    securityAnswer: '',
    emailPref: false,
    smsPref: false,
    idNumber: '',
    twoFactorStatus: '',
    securitySettings: ''
  };

  constructor() { }

  ngOnInit() {
  }

  toggleSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    const arrow = section?.previousElementSibling?.querySelector('.arrow') as HTMLElement;

    if (section) {
      if (section.classList.contains('show')) {
        section.classList.remove('show');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
      } else {
        section.classList.add('show');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
      }
    }
  }
}
