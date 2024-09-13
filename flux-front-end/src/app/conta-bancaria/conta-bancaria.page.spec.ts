import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContaBancariaPage } from './conta-bancaria.page';

describe('ContaBancariaPage', () => {
  let component: ContaBancariaPage;
  let fixture: ComponentFixture<ContaBancariaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaBancariaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
