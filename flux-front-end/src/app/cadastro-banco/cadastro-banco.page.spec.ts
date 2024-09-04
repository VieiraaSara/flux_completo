import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroBancoPage } from './cadastro-banco.page';

describe('CadastroBancoPage', () => {
  let component: CadastroBancoPage;
  let fixture: ComponentFixture<CadastroBancoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroBancoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
