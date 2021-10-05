import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistEditorComponent } from './artist-editor.component';

describe('ArtistEditorComponent', () => {
  let component: ArtistEditorComponent;
  let fixture: ComponentFixture<ArtistEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
