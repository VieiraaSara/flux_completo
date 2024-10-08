import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermosCondicoesPage } from './termos-condicoes.page';

describe('TermosCondicoesPage', () => {
  let component: TermosCondicoesPage;
  let fixture: ComponentFixture<TermosCondicoesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TermosCondicoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
