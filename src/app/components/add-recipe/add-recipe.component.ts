import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';

// PrimeNG Imports
import { InputText } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// ngx‑translate Imports
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputText,
    InputTextarea,
    DropdownModule,
    ButtonModule,
    ToastModule,
    TranslateModule
  ],
  providers: [MessageService],
  templateUrl: './add-recipe.component.html'
})
export class AddRecipeComponent {
  selectedImage: string | ArrayBuffer | null = null;
  recipeForm!: FormGroup;
  selectedCategory: any;
  imageError = false;
  imageName: string | null = null;
  submitting = false;
  foodOptions = [
    { name: 'BREAKFAST'},
    { name: 'LUNCH' },
    { name: 'DINNER'},
    { name: 'SNACK'},
    { name: 'DESSERTS'},
  ];

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private firebaseService: FirebaseService 
  ) {
    this.createForm();
  }

  // ✅ Create Reactive Form
  createForm() {
    this.recipeForm = this.fb.group({
      selectedCategory: [null, Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      ingredients: ['', [Validators.required, Validators.minLength(10)]],
      recipes: ['', [Validators.required, Validators.minLength(10)]], 
      image: [null], // Validators.required manually handle hoga
    });
  }

// ✅ Translate dropdown options
getTranslatedFoodOptions() {
  return this.foodOptions.map((option) => {
    return {
      ...option,
      name: this.translate.instant('foodOptions.' + option.name),
    };
  });
}


  // ✅ Handle Image Upload
  handleImageSelect(event: any): void {
    // Check if files are available before proceeding
    const file: File = event?.target?.files?.[0]; // Safely access files array
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.imageName = file.name; // Set the image name
      };
  
      reader.readAsDataURL(file); // Read file as base64 string
      this.recipeForm.get('image')?.setValue(file); // Set image value in form
      this.imageError = false;
    } else {
      this.imageError = true; // Handle case where no file is selected
      this.imageName = null; // Reset image name
    }
  }
  

  submitRecipeForm() {
    if (!this.recipeForm.get('image')?.value) {
      this.imageError = true;
    }
  
    if (this.recipeForm.valid && !this.imageError) {
      this.submitting = true; // ✅ Disable button during submission
  
      const formValue = this.recipeForm.value;
  
      const recipe: Recipe = {
        title: formValue.title,
        description: formValue.description,
        foodType: formValue.selectedCategory?.name || '',  // Ensure a valid string is passed
        ingredients: formValue.ingredients,
        recipes: formValue.recipes,
       image: typeof this.selectedImage === 'string' ? this.selectedImage : ''
      };
  
      this.firebaseService.addRecipe(recipe)
        .then(() => {
          this.showSuccessToast();
          this.recipeForm.reset();
          this.selectedImage = null;
          this.imageError = false;
          this.submitting = false; // ✅ Enable button again
        })
        .catch((error) => {
          this.showErrorToast();
          console.error('🔥 Firebase Error:', error);
          this.submitting = false; // ✅ Even on error, enable button
        });
  
    } else {
      this.recipeForm.markAllAsTouched();
      this.showErrorToast();
    }
  }
  
  

  showSuccessToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Recipe added successfully!',
      life: 5000,
    });
  }

  showErrorToast() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please fill out all required fields correctly',
      life: 5000,
    });
  }
}