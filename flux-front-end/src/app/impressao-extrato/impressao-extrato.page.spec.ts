import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImpressaoExtratoPage } from './impressao-extrato.page';

describe('ImpressaoExtratoPage', () => {
  let component: ImpressaoExtratoPage;
  let fixture: ComponentFixture<ImpressaoExtratoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressaoExtratoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
