import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  constructor(private fb:FormBuilder, private _snackBar:MatSnackBar,private registerService:UserService) { }

  ngOnInit(): void {
  }

  registerForm=this.fb.group({
    firstName:['',[Validators.required,Validators.minLength(2)]],
    lastName:[''],
    email:['',[Validators.required,Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    confirmPassword:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    gender:[''],
    age:[0,[this.ageValidate]],
    phone:['',[Validators.pattern(/^[789]\d{9,9}$/)]],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zipCode: ['',[Validators.pattern(/^[0-9]{5,6}$/)]],
    })
  },{validators:[this.passwordMatcher]})

  // Getter Methods to get the formControl values 
  get firstName(){
    return this.registerForm.get("firstName");
  }
  get lastName(){
    return this.registerForm.get("lastName");
  }
  get email (){
    return this.registerForm.get("email");
  }
  get password(){
    return this.registerForm.get("password");
  }
  get confirmPassword (){
    return this.registerForm.get("confirmPassword");
  }
  get gender(){
    return this.registerForm.get("gender");
  }
  get age(){
    return this.registerForm.get("age");
  }
  get phone(){
    return this.registerForm.get("phone");
  }
  get street (){
    return this.registerForm.get("street");
  }
  get city(){
    return this.registerForm.get("city");
  }
  get state(){
    return this.registerForm.get("state");
  }
  get zipCode(){
    return this.registerForm.get("zipCode");
  }

  // Submit Method 
  addUser(){
    let register:User=this.registerForm.value as User;
    this.registerService.addUser(register).subscribe({
      next:data=>{
        this._snackBar.open("Congrats!! You have submitted the form!!","success",{
          duration:5000,
          panelClass:['mat-primary','mat-toolbar']
        })
      },
      error:errors=>{
        this._snackBar.open("Failed to register user !! Please Try Again Later","Failure",{
          duration:3000,
          panelClass:['mat-toolbar','mat-accent']
        })
      }
    })
  }

// Password validation 
  passwordMatcher(fg:AbstractControl){
    const passwordValue=fg.get("password")?.value;
    const confirmPasswordValue=fg.get("confirmPassword")?.value;
    if(!passwordValue||!confirmPasswordValue){
      return null;
    }
    if(passwordValue !== confirmPasswordValue){
      return {passwordMismatch:true};
    }
    return null;
  }

  // Age vaidation 
  ageValidate(ageValid:AbstractControl){
    const age=ageValid.value;
    if(age<18){
      return {invalidAge:true}
    }
    return null;
  }
}
