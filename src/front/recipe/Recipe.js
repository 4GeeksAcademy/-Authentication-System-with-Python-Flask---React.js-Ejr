import React from 'react';
import './recipe.css';

const recipes = [
    {
      id: 1,
      title: 'Classic Chocolate Chip Cookies',
      ingredients: ['2 1/4 cups all-purpose flour', '1/2 teaspoon baking soda', '1 cup unsalted butter, softened', '1/2 cup granulated sugar', '1 cup packed brown sugar', '1 teaspoon vanilla extract', '2 large eggs', '2 cups semisweet chocolate chips'],
      instructions: '1. Preheat oven to 350°F (175°C). 2. In a small bowl, combine flour and baking soda. Set aside. 3. In a large mixing bowl, beat together butter, granulated sugar, brown sugar, and vanilla extract until creamy. Add eggs, one at a time, beating well after each addition. Gradually beat in flour mixture. Stir in chocolate chips. 4. Drop rounded tablespoons of dough onto ungreased baking sheets. 5. Bake for 9-11 minutes or until golden brown. Cool on baking sheets for 2 minutes; remove to wire racks to cool completely.',
      image: 'chocolate_chip_cookies.jpg',
    },
    {
      id: 2,
      title: 'Homemade Pizza',
      ingredients: ['1 batch pizza dough', '1/2 cup pizza sauce', '1 1/2 cups shredded mozzarella cheese', 'Assorted toppings (e.g., pepperoni, bell peppers, onions, mushrooms, olives)'],
      instructions: '1. Preheat oven to 475°F (245°C). 2. Roll out pizza dough on a lightly floured surface. 3. Transfer dough to a lightly greased pizza pan or baking sheet. 4. Spread pizza sauce evenly over dough. 5. Sprinkle cheese over sauce and add desired toppings. 6. Bake in preheated oven for 12-15 minutes, or until crust is golden brown and cheese is bubbly.',
      image: 'homemade_pizza.jpg',
    },
    {
        id: 3,
        title: "Chicken Alfredo Pasta",
        ingredients: ["8 ounces fettuccine pasta", "2 tablespoons unsalted butter", "2 cloves garlic, minced", "1 cup heavy cream", "1 cup grated Parmesan cheese", "Salt and pepper to taste", "2 cups cooked chicken breast, diced", "Fresh parsley for garnish"],
        instructions: "1. Cook fettuccine according to package instructions. Drain and set aside. 2. In a large skillet, melt butter over medium heat. Add minced garlic and cook until fragrant. 3. Stir in heavy cream and bring to a simmer. 4. Gradually whisk in Parmesan cheese until sauce is smooth and thickened. Season with salt and pepper. 5. Add cooked chicken to the sauce and heat through. 6. Toss cooked pasta with the sauce until well coated. 7. Serve hot, garnished with fresh parsley.",
        image: "chicken_alfredo_pasta.jpg",
      },
      {
        id: 4,
        title: "Fresh Fruit Salad",
        ingredients: ["2 cups strawberries, sliced", "1 cup blueberries", "1 cup grapes, halved", "1 cup pineapple chunks", "1 cup mango chunks", "1/4 cup honey", "Juice of 1 lemon", "Fresh mint leaves for garnish"],
        instructions: "1. In a large bowl, combine strawberries, blueberries, grapes, pineapple, and mango. 2. In a small bowl, whisk together honey and lemon juice. Pour over fruit and toss gently to coat. 3. Garnish with fresh mint leaves. 4. Serve immediately or refrigerate until ready to serve.",
        image: "fruit_salad.jpg",
      },
      {
        id: 5,
        title: "Vegetable Stir-Fry",
        ingredients: ["2 tablespoons vegetable oil", "2 cloves garlic, minced", "1 tablespoon ginger, minced", "2 cups mixed vegetables (e.g., bell peppers, broccoli, carrots, snow peas)", "1/4 cup soy sauce", "1 tablespoon rice vinegar", "1 tablespoon honey", "Cooked rice for serving"],
        instructions: "1. Heat vegetable oil in a large skillet or wok over medium-high heat. 2. Add minced garlic and ginger, and stir-fry for 30 seconds. 3. Add mixed vegetables and stir-fry until crisp-tender. 4. In a small bowl, whisk together soy sauce, rice vinegar, and honey. Pour over vegetables and toss to coat. 5. Serve over cooked rice.",
        image: "vegetable_stir_fry.jpg",
      },
      {
        id: 6,
        title: "Tiramisu",
        ingredients: ["6 egg yolks", "3/4 cup granulated sugar", "1 cup mascarpone cheese", "1 1/2 cups heavy cream", "2 cups brewed espresso, cooled", "1/4 cup coffee liqueur", "Ladyfinger cookies", "Cocoa powder for dusting"],
        instructions: "1. In a heatproof bowl, whisk together egg yolks and sugar until well combined. Place bowl over a pot of simmering water, making sure the bottom of the bowl does not touch the water. Cook, whisking constantly, until mixture thickens and coats the back of a spoon. Remove from heat and let cool slightly. 2. In a separate bowl, beat mascarpone cheese until smooth. Gradually add the cooled egg mixture and mix until well combined. 3. In another bowl, whip heavy cream until stiff peaks form. Gently fold whipped cream into mascarpone mixture. 4. In a shallow dish, combine brewed espresso and coffee liqueur. Dip ladyfinger cookies into the espresso mixture briefly and line the bottom of a serving dish with them. 5. Spread half of the mascarpone mixture over the ladyfingers. Repeat with another layer of dipped ladyfingers and remaining mascarpone mixture. 6. Cover and refrigerate tiramisu for at least 4 hours, or overnight. 7. Before serving, dust with cocoa powder.",
        image: "tiramisu.jpg",
      },
  ];
  function Recipe({ recipes }) {
    return (
        <div>
            {recipes.map(recipe => (
                <div key={recipe.id} className='recipe'>
                    <h2>{recipe.title}</h2>
                    <img src={recipe.image} alt={recipe.title} />
                    <h3>Ingredients</h3>
                    <ul>
                        {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                        ))}
                    </ul>

                    <h3>Instructions</h3>
                    <p>{recipe.instructions}</p>
                </div>
            ))}
        </div>
    );
}

export default Recipe