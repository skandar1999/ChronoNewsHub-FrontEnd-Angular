import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsArticlesComponent } from './sports-articles.component';

describe('SportsArticlesComponent', () => {
  let component: SportsArticlesComponent;
  let fixture: ComponentFixture<SportsArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportsArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
