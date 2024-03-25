import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeallContactsComponent } from './listeall-contacts.component';

describe('ListeallContactsComponent', () => {
  let component: ListeallContactsComponent;
  let fixture: ComponentFixture<ListeallContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeallContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeallContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
