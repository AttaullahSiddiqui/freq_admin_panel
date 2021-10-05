import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GenreSongsEditorComponent } from "./genre-songs-editor.component";

describe("GenreSongsEditorComponent", () => {
  let component: GenreSongsEditorComponent;
  let fixture: ComponentFixture<GenreSongsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenreSongsEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreSongsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
