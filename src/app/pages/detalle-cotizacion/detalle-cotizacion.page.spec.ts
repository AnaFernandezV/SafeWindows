import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleCotizacionPage } from './detalle-cotizacion.page';

describe('DetalleCotizacionPage', () => {
  let component: DetalleCotizacionPage;
  let fixture: ComponentFixture<DetalleCotizacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleCotizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
