import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLagosEndorseIgniteComponent } from './post-lagos-endorse-ignite.component';

describe('PostLagosEndorseIgniteComponent', () => {
  let component: PostLagosEndorseIgniteComponent;
  let fixture: ComponentFixture<PostLagosEndorseIgniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostLagosEndorseIgniteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLagosEndorseIgniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
