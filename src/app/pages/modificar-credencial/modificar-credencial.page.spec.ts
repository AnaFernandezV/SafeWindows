import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarCredencialPage } from './modificar-credencial.page';

describe('ModificarCredencialPage', () => {
  let component: ModificarCredencialPage;
  let fixture: ComponentFixture<ModificarCredencialPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarCredencialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
