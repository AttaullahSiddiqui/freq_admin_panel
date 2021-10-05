import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSongsEditorComponent } from './playlist-songs-editor.component';

describe('PlaylistSongsEditorComponent', () => {
  let component: PlaylistSongsEditorComponent;
  let fixture: ComponentFixture<PlaylistSongsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistSongsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistSongsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
