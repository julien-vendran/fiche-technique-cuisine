import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllergensComponent } from './list-allergens.component';

describe('ListAllergensComponent', () => {
  let component: ListAllergensComponent;
  let fixture: ComponentFixture<ListAllergensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllergensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllergensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
