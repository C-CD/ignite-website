import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGovernorVisitsVeniaBusinessHubComponent } from './post-governor-visits-venia-business-hub.component';

describe('PostGovernorVisitsVeniaBusinessHubComponent', () => {
  let component: PostGovernorVisitsVeniaBusinessHubComponent;
  let fixture: ComponentFixture<PostGovernorVisitsVeniaBusinessHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostGovernorVisitsVeniaBusinessHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGovernorVisitsVeniaBusinessHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
