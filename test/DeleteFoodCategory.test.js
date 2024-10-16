import { deleteFoodCategory } from '../src/views/pages/Managers/FoodCategory/hook'; // Adjust the path as necessary

// Mock data
const foodCategories = [
  { id: 1, name: 'Fruits' },
  { id: 2, name: 'Vegetables' },
  { id: 3, name: 'Dairy' },
];

// Mock function
jest.mock('../src/views/pages/Managers/FoodCategory/hook', () => ({
    deleteFoodCategory: jest.fn((id) => {
        const index = foodCategories.findIndex(category => category.id === id);
        if (index !== -1) {
            foodCategories.splice(index, 1);
            return true;
        }
        return false;
    }),
}));

describe('DeleteFoodCategory', () => {
  beforeEach(() => {
    // Reset mock data before each test
    foodCategories.length = 0;
    foodCategories.push(
      { id: 1, name: 'Fruits' },
      { id: 2, name: 'Vegetables' },
      { id: 3, name: 'Dairy' }
    );
  });

  test('should delete the correct food category', () => {
    const result = deleteFoodCategory(2);
    expect(result).toBe(true);
    expect(foodCategories).toEqual([
      { id: 1, name: 'Fruits' },
      { id: 3, name: 'Dairy' },
    ]);
  });

  test('should return false if the category does not exist', () => {
    const result = deleteFoodCategory(4);
    expect(result).toBe(false);
    expect(foodCategories).toEqual([
      { id: 1, name: 'Fruits' },
      { id: 2, name: 'Vegetables' },
      { id: 3, name: 'Dairy' },
    ]);
  });
});