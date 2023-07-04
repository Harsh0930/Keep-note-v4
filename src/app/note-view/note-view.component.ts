import { Component, OnInit } from '@angular/core';
import { Note } from '../models/notes';
import { NOTELIST } from '../models/noteList';
import { NoteServiceService } from '../services/note-service.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
notes:Note[]=NOTELIST;
visible:boolean=false;
  constructor(private noteService:NoteServiceService) { }

  ngOnInit(): void {
    this.noteService.getNotes().subscribe({
      next: observer=>{
        this.notes=observer;
      },
      error: error=>{
        alert("Failed to Fetch Notes Due to Server Error !!");
      }
    })
  }

  onSearchNoteCards(searchText:string){
    this.noteService.getNotes().subscribe({
      next: observer=>{
        if(searchText!=='' || searchText){
          this.notes=this.notes.filter(option=>option.title?.startsWith(searchText));
        }
        else{
          this.notes=observer;
        }
      },
      error: error=>{
        alert("Network Error !! Please Try Again Later");
      }
    })
  }

  onNoteAdded($event:any){
    this.notes.push($event);
  }
onClick(){
  this.visible=!this.visible;
}

}
