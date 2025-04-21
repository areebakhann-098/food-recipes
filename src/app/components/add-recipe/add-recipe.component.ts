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
export class AddRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;
  imageName = '';
  imageError = false;
  submitting = false;
  foodTypes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private translate: TranslateService,
    private firebaseService: FirebaseService
  ) {
    this.recipeForm = this.fb.group({
      foodType: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      ingredients: ['', [Validators.required, Validators.minLength(10)]],
      image: [null] 
    });
  }

  ngOnInit(): void {
    this.loadFoodTypes();
    this.translate.onLangChange.subscribe(() => {
      this.loadFoodTypes();
    });
  }

  loadFoodTypes(): void {
    this.foodTypes = [
      { label: this.translate.instant('BREAKFAST'), value: 'breakfast' },
      { label: this.translate.instant('LUNCH'), value: 'lunch' },
      { label: this.translate.instant('DINNER'), value: 'dinner' },
      { label: this.translate.instant('SNACK'), value: 'snack' }
    ];
  }

  // ✅ Handle Image Upload & Preview
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.selectedImage = reader.result;
    };

    reader.readAsDataURL(file);
    this.recipeForm.patchValue({ image: file });
    this.imageName = file.name;
    this.imageError = false;
  }

  // ✅ Submit with Firebase
  onSubmit(): void {
    const imageFile = this.recipeForm.get('image')?.value;

    if (!imageFile) {
      this.imageError = true;
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('ERROR'),
        detail: this.translate.instant('IMAGE_REQUIRED') || 'Image is required'
      });
      return;
    }

    if (this.recipeForm.invalid || this.imageError) {
      this.recipeForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('ERROR'),
        detail: this.translate.instant('VALIDATION_ERROR') || 'Please fill out all required fields correctly'
      });
      return;
    }

    this.submitting = true;

    const formValue = this.recipeForm.value;

    const recipe: Recipe = {
      title: formValue.title,
      description: formValue.description,
      foodType: formValue.foodType,
      ingredients: formValue.ingredients,
      image: typeof this.selectedImage === 'string' ? this.selectedImage : ''
    };

    this.firebaseService.addRecipe(recipe)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('SUCCESS'),
          detail: this.translate.instant('RECIPE_ADDED') || 'Recipe added successfully!'
        });
        this.recipeForm.reset();
        this.selectedImage = null;
        this.imageName = '';
        this.imageError = false;
        this.submitting = false;
      })
      .catch((error) => {
        console.error('🔥 Firebase Error:', error);
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('ERROR'),
          detail: this.translate.instant('FIREBASE_ERROR') || 'Something went wrong while saving the recipe.'
        });
        this.submitting = false;
      });
  }
}
