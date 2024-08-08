import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarTransportePage } from './modificar-transporte.page';

describe('ModificarTransportePage', () => {
  let component: ModificarTransportePage;
  let fixture: ComponentFixture<ModificarTransportePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarTransportePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
