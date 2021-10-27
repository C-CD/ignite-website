import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFirstOfItsKindComponent } from './post-first-of-its-kind.component';

describe('PostFirstOfItsKindComponent', () => {
  let component: PostFirstOfItsKindComponent;
  let fixture: ComponentFixture<PostFirstOfItsKindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFirstOfItsKindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFirstOfItsKindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
