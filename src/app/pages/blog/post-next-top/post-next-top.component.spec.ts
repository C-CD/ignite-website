import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNextTopComponent } from './post-next-top.component';

describe('PostNextTopComponent', () => {
  let component: PostNextTopComponent;
  let fixture: ComponentFixture<PostNextTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostNextTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostNextTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
