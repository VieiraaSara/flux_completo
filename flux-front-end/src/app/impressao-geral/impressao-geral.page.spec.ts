import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImpressaoGeralPage } from './impressao-geral.page';

describe('ImpressaoGeralPage', () => {
  let component: ImpressaoGeralPage;
  let fixture: ComponentFixture<ImpressaoGeralPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressaoGeralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
