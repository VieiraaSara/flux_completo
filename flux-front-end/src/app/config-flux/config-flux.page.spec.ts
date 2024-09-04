import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigFluxPage } from './config-flux.page';

describe('ConfigFluxPage', () => {
  let component: ConfigFluxPage;
  let fixture: ComponentFixture<ConfigFluxPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFluxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
