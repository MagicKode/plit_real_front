import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesEditModalComponent } from './prices-edit-modal';

describe('PricesEditModal', () => {
  let component: PricesEditModalComponent;
  let fixture: ComponentFixture<PricesEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricesEditModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PricesEditModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
