import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroEditModal } from './hero-edit-modal';

describe('HeroEditModal', () => {
  let component: HeroEditModal;
  let fixture: ComponentFixture<HeroEditModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroEditModal],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroEditModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
