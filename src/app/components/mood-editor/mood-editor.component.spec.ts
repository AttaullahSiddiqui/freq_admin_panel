import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodEditorComponent } from './mood-editor.component';

describe('MoodEditorComponent', () => {
  let component: MoodEditorComponent;
  let fixture: ComponentFixture<MoodEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoodEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function beforeEach(arg0: (done: any) => any) {
  throw new Error('Function not implemented.');
}

function expect(component: MoodEditorComponent) {
  throw new Error('Function not implemented.');
}

