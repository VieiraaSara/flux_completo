import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarteiraPage } from './carteira.page';

describe('CarteiraPage', () => {
  let component: CarteiraPage;
  let fixture: ComponentFixture<CarteiraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteiraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
