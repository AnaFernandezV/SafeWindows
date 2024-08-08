import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuestrosTrabajosPage } from './nuestros-trabajos.page';

describe('NuestrosTrabajosPage', () => {
  let component: NuestrosTrabajosPage;
  let fixture: ComponentFixture<NuestrosTrabajosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NuestrosTrabajosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
