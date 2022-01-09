import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenreeInfoComponent } from './denree-info.component';

describe('DenreeInfoComponent', () => {
  let component: DenreeInfoComponent;
  let fixture: ComponentFixture<DenreeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenreeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenreeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
