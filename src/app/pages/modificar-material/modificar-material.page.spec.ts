import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarMaterialPage } from './modificar-material.page';

describe('ModificarMaterialPage', () => {
  let component: ModificarMaterialPage;
  let fixture: ComponentFixture<ModificarMaterialPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
