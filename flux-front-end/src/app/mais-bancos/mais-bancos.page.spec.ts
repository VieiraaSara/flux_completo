import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaisBancosPage } from './mais-bancos.page';

describe('MaisBancosPage', () => {
  let component: MaisBancosPage;
  let fixture: ComponentFixture<MaisBancosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaisBancosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
