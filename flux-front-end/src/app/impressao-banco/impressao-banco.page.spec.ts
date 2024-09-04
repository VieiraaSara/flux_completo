import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImpressaoBancoPage } from './impressao-banco.page';

describe('ImpressaoBancoPage', () => {
  let component: ImpressaoBancoPage;
  let fixture: ComponentFixture<ImpressaoBancoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressaoBancoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
