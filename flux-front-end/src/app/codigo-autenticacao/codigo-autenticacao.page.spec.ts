import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoAutenticacaoPage } from './codigo-autenticacao.page';

describe('CodigoAutenticacaoPage', () => {
  let component: CodigoAutenticacaoPage;
  let fixture: ComponentFixture<CodigoAutenticacaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoAutenticacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
