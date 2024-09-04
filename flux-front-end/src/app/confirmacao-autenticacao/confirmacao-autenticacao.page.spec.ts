import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacaoAutenticacaoPage } from './confirmacao-autenticacao.page';

describe('ConfirmacaoAutenticacaoPage', () => {
  let component: ConfirmacaoAutenticacaoPage;
  let fixture: ComponentFixture<ConfirmacaoAutenticacaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacaoAutenticacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
