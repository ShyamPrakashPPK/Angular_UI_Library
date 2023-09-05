import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAnimationComponent } from './ai-animation.component';

describe('AiAnimationComponent', () => {
  let component: AiAnimationComponent;
  let fixture: ComponentFixture<AiAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AiAnimationComponent]
    });
    fixture = TestBed.createComponent(AiAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
