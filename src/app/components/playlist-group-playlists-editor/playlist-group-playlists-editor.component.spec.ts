import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PlaylistGroupPlaylistsEditorComponent } from "./playlist-group-playlists-editor.component";

describe("PlaylistGroupPlaylistsEditorComponent", () => {
  let component: PlaylistGroupPlaylistsEditorComponent;
  let fixture: ComponentFixture<PlaylistGroupPlaylistsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistGroupPlaylistsEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistGroupPlaylistsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
