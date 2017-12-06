import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBuyComponent } from './card-buy.component';

describe('CardBuyComponent', () => {
  let component: CardBuyComponent;
  let fixture: ComponentFixture<CardBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
