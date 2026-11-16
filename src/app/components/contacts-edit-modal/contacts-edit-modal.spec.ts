import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsEditModal } from './contacts-edit-modal';

describe('ContactsEditModal', () => {
  let component: ContactsEditModal;
  let fixture: ComponentFixture<ContactsEditModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsEditModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsEditModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
