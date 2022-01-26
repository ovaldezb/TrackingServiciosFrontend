import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuinventarioComponent } from './menuinventario.component';

describe('MenuinventarioComponent', () => {
  let component: MenuinventarioComponent;
  let fixture: ComponentFixture<MenuinventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuinventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuinventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
