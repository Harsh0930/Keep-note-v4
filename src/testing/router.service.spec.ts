import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoteViewComponent } from 'src/app/note-view/note-view.component';
import { SearchComponent } from 'src/app/search/search.component';
// import { NoteService } from 'src/app/services/note.service';
import { NoteServiceService } from 'src/app/services/note-service.service';

// import { RouterService } from 'src/app/services/router.service';
import { NoteServiceStub } from './noteServiceStub';
import { NoteRouterService } from 'src/app/services/note-router.service';

describe('RouterService', () => {
  let service: NoteRouterService;
  let noteService: NoteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent
      ],
      providers: [
        { provide: NoteServiceService, useClass: NoteServiceStub }
      ]
    });
    service = TestBed.inject(NoteRouterService);
    noteService = TestBed.inject(NoteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain `navigateToNotesView()` method which navigates to notes view when called', fakeAsync(() => {
    const fixture = TestBed.createComponent(NoteViewComponent);
    service.toHome();
    tick();
    expect((fixture.nativeElement as HTMLElement).innerHTML).toContain("app-search");
  }));
});
