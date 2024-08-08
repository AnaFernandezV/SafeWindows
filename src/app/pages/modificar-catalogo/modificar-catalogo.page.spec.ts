import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarCatalogoPage } from './modificar-catalogo.page';

describe('ModificarCatalogoPage', () => {
  let component: ModificarCatalogoPage;
  let fixture: ComponentFixture<ModificarCatalogoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarCatalogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
