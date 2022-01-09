import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDenreeComponent } from './create-denree.component';

describe('CreateDenreeComponent', () => {
  let component: CreateDenreeComponent;
  let fixture: ComponentFixture<CreateDenreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDenreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDenreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
