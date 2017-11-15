import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSioComponent } from './detail-sio.component';

describe('DetailSioComponent', () => {
  let component: DetailSioComponent;
  let fixture: ComponentFixture<DetailSioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
