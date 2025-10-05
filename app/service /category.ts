// src/services/categoryService.ts
import { apiFetch } from "./http";

export const createCategory = (categoryForm: { name: string; description?: string }) =>
  apiFetch("/category", {
    method: "POST",
    body: JSON.stringify(categoryForm),
  });

export async function getAllCategories() {
  return apiFetch("/category", {
    method: "GET",
  });
}