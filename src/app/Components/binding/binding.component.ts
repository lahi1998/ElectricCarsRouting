import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent {
  a: string = "some text";
  inputText: string | undefined;
  TheForm: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.TheForm = this.formBuilder.group({
      inputText: ['', Validators.required], 
    });
  }

  textChanged() {
    this.a = 'Text has been changed';
    console.log('Text has been changed');
  }

  onSubmit() {
    if (this.TheForm.invalid) {
      return;
    }

    this.inputText = this.TheForm.controls['inputText'].value; 
    console.log(this.inputText);
  }
}
