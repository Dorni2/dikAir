import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsCountComponent } from './bookings-count.component';

describe('BookingsCountComponent', () => {
  let component: BookingsCountComponent;
  let fixture: ComponentFixture<BookingsCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
