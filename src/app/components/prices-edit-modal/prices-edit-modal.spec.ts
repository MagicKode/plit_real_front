import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesEditModal } from './prices-edit-modal';

describe('PricesEditModal', () => {
  let component: PricesEditModal;
  let fixture: ComponentFixture<PricesEditModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricesEditModal],
    }).compileComponents();

    fixture = TestBed.createComponent(PricesEditModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
