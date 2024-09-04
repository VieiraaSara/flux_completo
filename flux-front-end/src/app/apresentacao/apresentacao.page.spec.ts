import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApresentacaoPage } from './apresentacao.page';

describe('ApresentacaoPage', () => {
  let component: ApresentacaoPage;
  let fixture: ComponentFixture<ApresentacaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ApresentacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
