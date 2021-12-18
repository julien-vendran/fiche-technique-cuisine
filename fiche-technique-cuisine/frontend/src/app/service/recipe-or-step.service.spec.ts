import { TestBed } from '@angular/core/testing';

import { RecipeOrStepService } from './recipe-or-step.service';

describe('RecipeOrStepService', () => {
  let service: RecipeOrStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeOrStepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
