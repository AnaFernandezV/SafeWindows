import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCatalogoPage } from './agregar-catalogo.page';

describe('AgregarCatalogoPage', () => {
  let component: AgregarCatalogoPage;
  let fixture: ComponentFixture<AgregarCatalogoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarCatalogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
