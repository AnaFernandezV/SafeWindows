import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCredencialPage } from './agregar-credencial.page';

describe('AgregarCredencialPage', () => {
  let component: AgregarCredencialPage;
  let fixture: ComponentFixture<AgregarCredencialPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarCredencialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
