import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
// import { NoteService } from 'src/app/services/note.service';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { NoteServiceStub } from './noteServiceStub';

import { NoteEditComponent } from 'src/app/note-edit/note-edit.component';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Note } from 'src/app/models/notes';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
// import { RouterService } from 'src/app/services/router.service';
import { NoteRouterService } from 'src/app/services/note-router.service';
import { RouterServiceStub } from './routerServiceStub';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';

describe('NoteEditComponent', () => {
  let component: NoteEditComponent;
  let fixture: ComponentFixture<NoteEditComponent>;
  let noteService: NoteServiceService;
  let routerService: NoteRouterService;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteEditComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: NoteServiceService, useClass: NoteServiceStub },
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of({ get: (id: any) => 301 })
          }
        },
        { provide: NoteRouterService, useClass: RouterServiceStub }
      ]
    })
      .compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NoteEditComponent);
    component = fixture.componentInstance;
    noteService = TestBed.inject(NoteServiceService);
    routerService = TestBed.inject(NoteRouterService);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain `editNote()` method to modify note details', () => {
    expect(component.modifyNote).toBeTruthy();
  });

  it('should call getNote() to fetch note by id when the component is loaded', fakeAsync(() => {
    const note: Note = {
      id: 301,
      title: "Dummy Note",
      content: "Dummy note contents for test code"
    }
    const spyNoteService = spyOn(noteService, "getNote").and.callThrough().and.returnValue(of(note));
    // component.id = 112;

    router.navigateByUrl("/notes/301").then(() => {
      component.ngOnInit();
      expect(spyNoteService).toHaveBeenCalledOnceWith(301);
      expect(component.note).toEqual(note);
      flush();
    });

  }));

  it('should call editNote() and navigate to landing view after server successfully modifies the note', () => {
    const note: Note = {
      id: 301,
      title: "Dummy Note",
      content: "Dummy note contents for test code"
    }
    const spyNoteService = spyOn(noteService, "modifyNote").and.callThrough();
    const spyRouterService = spyOn(routerService, "toHome").and.callThrough();
    // component.id = 301;
    component.note = note;
    let button = fixture.debugElement.query(By.css('button'));

    fixture.ngZone?.run(() => {
      button.triggerEventHandler("click", null);
      expect(spyNoteService).toHaveBeenCalledWith(301, note);
      expect(spyRouterService).toHaveBeenCalled();
    });

  });

});
