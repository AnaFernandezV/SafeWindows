import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarManoObraPage } from './modificar-mano-obra.page';

describe('ModificarManoObraPage', () => {
  let component: ModificarManoObraPage;
  let fixture: ComponentFixture<ModificarManoObraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarManoObraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
