import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteServiceService } from '../services/note-service.service';
import { Note } from '../models/notes';
import { NoteRouterService } from '../services/note-router.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private noteService:NoteServiceService,private noteRouterService:NoteRouterService) { }

  note:Note={id:0,title:"",content:""}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let id=params.get("id")??0;
      this.noteService.getNote(+id).subscribe(data=>{
        this.note=data;
      })
    })
  }

  modifyNote(){
    this.noteService.modifyNote(this.note?.id,this.note).subscribe(data=>{
      this.note=data;
      this.noteRouterService.toHome();
    })
  }

  

}
