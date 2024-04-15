import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticsArticlesComponent } from './politics-articles.component';

describe('PoliticsArticlesComponent', () => {
  let component: PoliticsArticlesComponent;
  let fixture: ComponentFixture<PoliticsArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticsArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticsArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
