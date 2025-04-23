import { Injectable, signal } from '@angular/core';
import { environment } from '../../environment';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Recipe } from '../models/recipe';

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
      // Adding the recipe to Firestore
      const docRef = await addDoc(collection(this.db, 'recipes'), {
        
        title: recipe.title,
        description: recipe.description,
        foodType: recipe.foodType,
        ingredients: recipe.ingredients,
        recipes: recipe.recipes, 
        image: recipe.image
      });
  
      // Get the document id directly from docRef.id
      const recipeId = docRef.id;
  
      // Update the recipe object with the id (optional: if you want to store this locally)
      recipe.id = recipeId;
  
      console.log(`Recipe added with ID: ${recipeId}`);
  
      this.recipeAdded.set(true);  // Recipe has been successfully added
      this.errorOccurred.set(null);  // No error
    } catch (e) {
      console.error("Error adding recipe: ", e);
  
      // Update the signal to indicate an error
      this.recipeAdded.set(false);
      this.errorOccurred.set('Failed to add recipe to Firestore.');
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

  async getRecipeById(id: string): Promise<Recipe | undefined> {
    try {
      const recipeDoc = doc(this.db, 'recipes', id);
      const recipeSnap = await getDoc(recipeDoc);

      if (recipeSnap.exists()) {
        return {
          id: recipeSnap.id,
          ...(recipeSnap.data() as Recipe)
        };
      } else {
        return undefined;
      }
    } catch (error) {
      console.error('Error fetching recipe by ID:', error);
      throw new Error('Failed to fetch recipe');
    }
  }
}
