
export interface Macros {
  protein: number;
  carbs: number;
  fats: number;
}

export interface Recipe {
  prepTime: string;
  servings: string;
  ingredients: string[];
  steps: string[];
}

export interface AnalysisResult {
  foodName: string;
  calories: number;
  macros: Macros;
  healthBenefits: string[];
  risks: string[];
  healthTip: string;
  recipe: Recipe;
  isFoodUnclear?: boolean;
}
