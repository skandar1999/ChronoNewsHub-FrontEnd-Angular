import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyArticlesComponent } from './technology-articles.component';

describe('TechnologyArticlesComponent', () => {
  let component: TechnologyArticlesComponent;
  let fixture: ComponentFixture<TechnologyArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
