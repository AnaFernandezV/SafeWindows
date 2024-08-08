import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarProveedorPage } from './modificar-proveedor.page';

describe('ModificarProveedorPage', () => {
  let component: ModificarProveedorPage;
  let fixture: ComponentFixture<ModificarProveedorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarProveedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
