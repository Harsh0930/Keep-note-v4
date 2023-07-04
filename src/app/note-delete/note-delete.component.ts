import { Component, OnInit } from '@angular/core';
import { Note } from '../models/notes';
import { ActivatedRoute } from '@angular/router';
import { NoteServiceService } from '../services/note-service.service';
import { NoteRouterService } from '../services/note-router.service';

@Component({
  selector: 'app-note-delete',
  templateUrl: './note-delete.component.html',
  styleUrls: ['./note-delete.component.css']
})
export class NoteDeleteComponent implements OnInit {

  note:any={};
  constructor(private activatedRoute:ActivatedRoute,private noteService:NoteServiceService, private noteRouterService:NoteRouterService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let id=params.get("id")??0;
      this.noteService.getNote(+id).subscribe(data=>{
        this.note=data;
      })
    })
  }

  deleteNote(){
    this.noteService.deleteNote(this.note?.id).subscribe(data=>{
      this.note=data;
      this.noteRouterService.toHome();
    })
  }
  
}
