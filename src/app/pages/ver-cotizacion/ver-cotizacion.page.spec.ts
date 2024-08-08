import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerCotizacionPage } from './ver-cotizacion.page';

describe('VerCotizacionPage', () => {
  let component: VerCotizacionPage;
  let fixture: ComponentFixture<VerCotizacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerCotizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
