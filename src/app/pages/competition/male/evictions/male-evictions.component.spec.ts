import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaleEvictionsComponent } from './male-evictions.component';

describe('MaleEvictionsComponent', () => {
  let component: MaleEvictionsComponent;
  let fixture: ComponentFixture<MaleEvictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaleEvictionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaleEvictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
