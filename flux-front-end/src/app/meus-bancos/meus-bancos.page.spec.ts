import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeusBancosPage } from './meus-bancos.page';

describe('MeusBancosPage', () => {
  let component: MeusBancosPage;
  let fixture: ComponentFixture<MeusBancosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusBancosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
