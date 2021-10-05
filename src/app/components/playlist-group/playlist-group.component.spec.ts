import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PlaylistGroupsComponent } from "./playlist-group.component";

describe("PlaylistGroupsComponent", () => {
  let component: PlaylistGroupsComponent;
  let fixture: ComponentFixture<PlaylistGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistGroupsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
