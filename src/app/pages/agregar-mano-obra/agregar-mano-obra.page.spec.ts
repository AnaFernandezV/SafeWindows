import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarManoObraPage } from './agregar-mano-obra.page';

describe('AgregarManoObraPage', () => {
  let component: AgregarManoObraPage;
  let fixture: ComponentFixture<AgregarManoObraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarManoObraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
