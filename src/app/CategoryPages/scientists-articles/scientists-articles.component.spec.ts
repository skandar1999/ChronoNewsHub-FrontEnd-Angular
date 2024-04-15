import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientistsArticlesComponent } from './scientists-articles.component';

describe('ScientistsArticlesComponent', () => {
  let component: ScientistsArticlesComponent;
  let fixture: ComponentFixture<ScientistsArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScientistsArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScientistsArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
