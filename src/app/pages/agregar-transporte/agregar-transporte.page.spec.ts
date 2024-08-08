import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarTransportePage } from './agregar-transporte.page';

describe('AgregarTransportePage', () => {
  let component: AgregarTransportePage;
  let fixture: ComponentFixture<AgregarTransportePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarTransportePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
