import { Injectable, signal } from '@angular/core';
import { environment } from '../../environment';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Recipe } from '../models/recipe';
import { getDocs } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app;
  private db;
  private storage;

  recipeAdded = signal<boolean>(false);
  errorOccurred = signal<string | null>(null);

  constructor() {
    // Initialize Firebase app
    this.app = initializeApp(environment.firebaseConfig);
    console.log('Firebase initialized:', this.app);

    // Firestore and Storage
    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }

  async addRecipe(recipe: Recipe) {
    try {
      await addDoc(collection(this.db, 'recipes'), {
        title: recipe.title,
        description: recipe.description,
        foodType: recipe.foodType,
        ingredients: recipe.ingredients,
        image: recipe.image
      });

      this.recipeAdded.set(true);
      this.errorOccurred.set(null);
    } catch (e) {
      console.error("Error adding recipe: ", e);
      this.recipeAdded.set(false);
      this.errorOccurred.set('Failed to add recipe to Firestore.');
    }
  }

  async uploadImage(file: File): Promise<string> {
    try {
      const filePath = `recipe-images/${Date.now()}-${file.name}`;
      const storageRef = ref(this.storage, filePath);

      // Upload the image
      await uploadBytes(storageRef, file);

      // Get the download URL
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Image upload failed');
    }
  }
  async getAllRecipes(): Promise<Recipe[]> {
    try {
      const snapshot = await getDocs(query(collection(this.db, 'recipes')));
      const recipes: Recipe[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Recipe[];
  
      return recipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw new Error('Failed to fetch recipes');
    }
  }
  async deleteRecipe(recipeId: string): Promise<void> {
    try {
      await deleteDoc(doc(this.db, 'recipes', recipeId));
      console.log(`✅ Recipe with ID ${recipeId} deleted`);
    } catch (error) {
      console.error('❌ Error deleting recipe:', error);
      throw new Error('Failed to delete recipe');
    }
  }
   
  
}
