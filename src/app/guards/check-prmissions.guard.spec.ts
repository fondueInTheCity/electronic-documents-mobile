import { TestBed, async, inject } from '@angular/core/testing';

import { CheckPrmissionsGuard } from './check-prmissions.guard';

describe('CheckPrmissionsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckPrmissionsGuard]
    });
  });

  it('should ...', inject([CheckPrmissionsGuard], (guard: CheckPrmissionsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
