import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarMaterialPage } from './agregar-material.page';

describe('AgregarMaterialPage', () => {
  let component: AgregarMaterialPage;
  let fixture: ComponentFixture<AgregarMaterialPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
