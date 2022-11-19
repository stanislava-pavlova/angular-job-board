import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationOffersComponent } from './organisation-offers.component';

describe('OrganisationOffersComponent', () => {
  let component: OrganisationOffersComponent;
  let fixture: ComponentFixture<OrganisationOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganisationOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
