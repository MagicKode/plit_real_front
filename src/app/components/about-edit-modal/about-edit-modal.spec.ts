import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutEditModal } from './about-edit-modal';

describe('AboutEditModal', () => {
  let component: AboutEditModal;
  let fixture: ComponentFixture<AboutEditModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutEditModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutEditModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
