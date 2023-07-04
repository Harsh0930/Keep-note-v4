import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NoteDeleteComponent } from './note-delete/note-delete.component';

export const routes:Routes =[
  {
  path:"notes",
  component:NoteViewComponent,
},
{
  path:"notes-edit/:id",
  component:NoteEditComponent,
},
{
  path:"notes-delete/:id",
  component:NoteDeleteComponent,
},
{
  path:"register-user",
  component:RegisterFormComponent,
},
{
path:"",
redirectTo:"notes",
pathMatch:"full"
},
{
  path:"**",
  component:PageNotFoundComponent,
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
