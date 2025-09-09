import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCompraDialog } from './nueva-compra-dialog';

describe('NuevaCompraDialog', () => {
  let component: NuevaCompraDialog;
  let fixture: ComponentFixture<NuevaCompraDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaCompraDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaCompraDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
