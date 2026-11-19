import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutEditModalComponent } from './about-edit-modal';

describe('AboutEditModal', () => {
  let component: AboutEditModalComponent;
  let fixture: ComponentFixture<AboutEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutEditModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutEditModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
