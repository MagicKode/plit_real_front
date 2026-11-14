import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCategories } from './portfolio-categories';

describe('PortfolioCategories', () => {
  let component: PortfolioCategories;
  let fixture: ComponentFixture<PortfolioCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioCategories],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
