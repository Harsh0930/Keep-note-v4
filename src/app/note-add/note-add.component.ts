import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Note } from '../models/notes';
import { NoteServiceService } from '../services/note-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css']
})
export class NoteAddComponent implements OnInit {
  note:Note={};

  @Output () noteAdded:EventEmitter<any>=new EventEmitter<any>();
  constructor(private noteService:NoteServiceService, private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }

  // addNotes(){
  //   this.noteService.addNote(this.note).subscribe({
  //     next: observer=>{
  //       alert("Note Added");
  //       this.noteAdded.emit(this.note);
  //       this.note={};
  //     },
  //     error: error=>{
  //       alert("Failed to Add Note Due to Sever Error !!");
  //     }
  //   })

  // }

  addNotes(noteForm:any){
    this.noteService.addNote(noteForm.value).subscribe({
      next:data=>{
        this._snackbar.open("Note add successfully", "success",{
          duration:5000,
          panelClass:['mat-toolbar','mat-primary']
        })
        this.noteAdded.emit(this.note);
        this.note={};
      },
      error:error=>{
        alert("Failed to Add Note Due to Server Error !!");
      }
    })

  }

}
