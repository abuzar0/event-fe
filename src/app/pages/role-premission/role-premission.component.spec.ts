import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePremissionComponent } from './role-premission.component';

describe('RolePremissionComponent', () => {
  let component: RolePremissionComponent;
  let fixture: ComponentFixture<RolePremissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolePremissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolePremissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
