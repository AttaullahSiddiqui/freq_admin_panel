import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PlaylistGroupEditorComponent } from "./playlist-group-editor.component";

describe("PlaylistGroupEditorComponent", () => {
  let component: PlaylistGroupEditorComponent;
  let fixture: ComponentFixture<PlaylistGroupEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistGroupEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistGroupEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
