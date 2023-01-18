import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesDisplayComponent } from './likes-display.component';

describe('LikesDisplayComponent', () => {
  let component: LikesDisplayComponent;
  let fixture: ComponentFixture<LikesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikesDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
