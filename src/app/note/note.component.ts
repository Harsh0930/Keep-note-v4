import { Component, OnInit,Input } from '@angular/core';
import { Note } from '../models/notes';
import { NOTELIST } from '../models/noteList';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

@Input () note?:Note;
  constructor() { }

  ngOnInit(): void {
  }

  
}
