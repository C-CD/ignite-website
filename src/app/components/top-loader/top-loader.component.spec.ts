import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLoaderComponent } from './top-loader.component';

describe('TopLoaderComponent', () => {
  let component: TopLoaderComponent;
  let fixture: ComponentFixture<TopLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
