import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreParcialDialog } from './cierre-parcial-dialog';

describe('CierreParcialDialog', () => {
  let component: CierreParcialDialog;
  let fixture: ComponentFixture<CierreParcialDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CierreParcialDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CierreParcialDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
