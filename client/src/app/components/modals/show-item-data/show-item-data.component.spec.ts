import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowItemDataComponent } from './show-item-data.component';

describe('ShowItemDataComponent', () => {
  let component: ShowItemDataComponent;
  let fixture: ComponentFixture<ShowItemDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowItemDataComponent]
    });
    fixture = TestBed.createComponent(ShowItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
