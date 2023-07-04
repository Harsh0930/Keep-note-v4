import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoteComponent } from 'src/app/note/note.component';
import { SearchComponent } from 'src/app/search/search.component';
// import { NoteService } from 'src/app/services/note.service';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { NoteServiceStub } from './noteServiceStub';

import { NoteViewComponent } from 'src/app/note-view/note-view.component';

import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NoteAddComponent } from 'src/app/note-add/note-add.component';

describe('NoteViewComponent', () => {
  let component: NoteViewComponent;
  let fixture: ComponentFixture<NoteViewComponent>;
  let noteService: NoteServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteViewComponent, SearchComponent,  NoteComponent, NoteAddComponent],
      imports: [ FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, NoopAnimationsModule, MatCardModule ],
      providers: [{ provide: NoteServiceService, useClass: NoteServiceStub }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NoteViewComponent);
    noteService = fixture.debugElement.injector.get(NoteServiceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
