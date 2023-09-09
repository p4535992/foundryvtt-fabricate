import {Recipe} from "../../src/scripts/crafting/recipe/Recipe";
import {Combination} from "../../src/scripts/common/Combination";
import {testComponentFive, testComponentFour, testComponentOne, testComponentThree, testComponentTwo} from "./TestCraftingComponents";
import {elementalEarth, elementalFire, elementalWater} from "./TestEssences";
import {SelectableOptions} from "../../src/scripts/crafting/selection/SelectableOptions";
import {LoadedFabricateItemData, PendingFabricateItemData} from "../../src/scripts/foundry/DocumentManager";
import Properties from "../../src/scripts/Properties";
import {testCraftingSystemOne} from "./TestCrafingSystem";
import {Unit} from "../../src/scripts/common/Unit";
import {RequirementOption} from "../../src/scripts/crafting/recipe/RequirementOption";
import {ResultOption} from "../../src/scripts/crafting/recipe/ResultOption";

function buildPendingItemData(name: string, itemUuid: string) {
    const loadedFabricateItemData = new LoadedFabricateItemData({
        name,
        itemUuid,
        imageUrl: Properties.ui.defaults.recipeImageUrl,
        sourceDocument: {}
    });
    return new PendingFabricateItemData(itemUuid, () => Promise.resolve(loadedFabricateItemData));
}

/**
* Essences: None
* Catalysts: None
* Ingredient Options: 2
* Result Options: 1
* */
const testRecipeOne: Recipe = new Recipe({
    id: "z2ixo2m312l",
    craftingSystemId: testCraftingSystemOne.id,
    itemData: buildPendingItemData("Test Recipe One", "Compendium.module.compendium-name.z2ixo2m312l"),
    requirementOptions: new SelectableOptions({
        options: [
            new RequirementOption({
                id: "z2ixo2m312l-requirement-1",
                name: "Option 1",
                ingredients: Combination.of(testComponentOne.toReference(), 1)
            }),
            new RequirementOption({
                id: "z2ixo2m312l-requirement-2",
                name: "Option 2",
                ingredients: Combination.of(testComponentThree.toReference(), 2)
            }),
        ]
    }),
    resultOptions: new SelectableOptions({
        options: [
            new ResultOption({
                id: "z2ixo2m312l-result-1",
                name: "Option 1",
                results: Combination.of(testComponentFive.toReference(), 1)
            })
        ]
    })
});

/**
* Essences: None
* Catalysts: 1
* Ingredient Options: 1
* Result Options: 1
* */
const testRecipeTwo: Recipe = new Recipe({
    id: "fzv66f90sd",
    craftingSystemId: testCraftingSystemOne.id,
    itemData: buildPendingItemData("Test Recipe Two", "Compendium.module.compendium-name.fzv66f90sd"),
    requirementOptions: new SelectableOptions({
        options: [
            new RequirementOption({
                id: "fzv66f90sd-requirement-1",
                name: "Option 1",
                ingredients: Combination.of(testComponentFour.toReference(), 1),
                catalysts: Combination.of(testComponentFive.toReference(), 1)
            })
        ]
    }),
    resultOptions: new SelectableOptions({
        options: [
            new ResultOption({
                id: "fzv66f90sd-result-1",
                name: "Option 1",
                results: Combination.of(testComponentTwo.toReference(), 2)
            })
        ]
    })
})

/**
* Essences: 2 types, 4 total
* Catalysts: None
* Ingredient Options: None
* Result Options: 1
* */
const testRecipeThree: Recipe = new Recipe({
    id: "5pux8ghlct",
    craftingSystemId: testCraftingSystemOne.id,
    itemData: buildPendingItemData("Test Recipe Three", "Compendium.module.compendium-name.5pux8ghlct"),
    requirementOptions: new SelectableOptions({
        options: [
            new RequirementOption({
                id: "5pux8ghlct-requirement-1",
                name: "Option 1",
                essences: Combination.ofUnits([
                    new Unit(elementalEarth.toReference(), 3),
                    new Unit(elementalFire.toReference(), 1)
                ])
            })
        ]
    }),
    resultOptions: new SelectableOptions({
        options: [
            new ResultOption({
                id: "5pux8ghlct-result-1",
                name: "Option 1",
                results: Combination.of(testComponentOne.toReference(), 3),
            })
        ]
    })
});

/**
* Essences: 2 Types, 3 total
* Catalysts: 1
* Ingredient Options: 1
* Result Options: 1
* */
const testRecipeFour: Recipe = new Recipe({
    id: "3lieym2gjef",
    craftingSystemId: testCraftingSystemOne.id,
    itemData: buildPendingItemData("Test Recipe Four", "Compendium.module.compendium-name.3lieym2gjef"),
    requirementOptions: new SelectableOptions({
        options: [
            new RequirementOption({
                id: "3lieym2gjef-requirement-1",
                name: "Option 1",
                ingredients: Combination.of(testComponentTwo.toReference(), 3),
                catalysts: Combination.of(testComponentThree.toReference(), 1),
                essences: Combination.ofUnits([
                    new Unit(elementalEarth.toReference(), 1),
                    new Unit(elementalWater.toReference(), 2)
                ])
            })
        ]
    }),
    resultOptions: new SelectableOptions({
        options: [
            new ResultOption({
                id: "3lieym2gjef-result-1",
                name: "Option 1",
                results: Combination.of(testComponentFive.toReference(), 10)
            })
        ]
    })
});

/**
* Essences: 2 Types, 2 total
* Catalysts: 1
* Ingredient Options: 1 Catalyst only
* Result Options: 1
* */
const testRecipeFive: Recipe = new Recipe({
    id: "fequ5qvoqh",
    craftingSystemId: testCraftingSystemOne.id,
    itemData: buildPendingItemData("Test Recipe Five", "Compendium.module.compendium-name.fequ5qvoqh"),
    requirementOptions: new SelectableOptions({
        options: [
            new RequirementOption({
                id: "fequ5qvoqh-requirement-1",
                name: "Option 1",
                catalysts: Combination.of(testComponentFour.toReference(), 1),
                essences: Combination.ofUnits([
                    new Unit(elementalFire.toReference(), 1),
                    new Unit(elementalWater.toReference(), 1)
                ])
            })
        ]
    }),
    resultOptions: new SelectableOptions({
        options: [
            new ResultOption({
                id: "fequ5qvoqh-result-1",
                name: "Option 1",
                results: Combination.of(testComponentFive.toReference(), 10)
            })
        ]
    })
});

/**
* Essences: 2 Types, 4 total
* Catalysts: None
* Ingredient Options: 2
* Result Options: 1
* */
const testRecipeSix: Recipe = new Recipe({
    id: "bx8luu4cpd",
    craftingSystemId: testCraftingSystemOne.id,
    itemData: buildPendingItemData("Test Recipe Six", "Compendium.module.compendium-name.bx8luu4cpd"),
    requirementOptions: new SelectableOptions({
        options: [
            new RequirementOption({
                id: "bx8luu4cpd-requirement-1",
                name: "Option 1",
                ingredients: Combination.ofUnits([
                    new Unit(testComponentOne.toReference(), 1),
                    new Unit(testComponentThree.toReference(), 2)
                ]),
                essences: Combination.ofUnits([
                    new Unit(elementalEarth.toReference(), 3),
                    new Unit(elementalWater.toReference(), 1)
                ]),
            }),
            new RequirementOption({
                id: "bx8luu4cpd-requirement-2",
                name: "Option 2",
                ingredients: Combination.of(testComponentTwo.toReference(), 1),
                essences: Combination.ofUnits([
                    new Unit(elementalEarth.toReference(), 3),
                    new Unit(elementalWater.toReference(), 1)
                ]),
            })
        ]
    }),
    resultOptions: new SelectableOptions({
        options: [
            new ResultOption({
                id: "bx8luu4cpd-result-1",
                name: "Option 1",
                results: Combination.of(testComponentThree.toReference(), 2)
            }),
            new ResultOption({
                id: "bx8luu4cpd-result-2",
                name: "Option 2",
                results: Combination.of(testComponentFive.toReference(), 2)
            })
        ]
    })
});

/**
* Essences: None
* Catalysts: None
* Ingredient Options: 1
* Result Options: 1
* */
const testRecipeSeven: Recipe = new Recipe({
    id: "8kimdf8z83",
    craftingSystemId: testCraftingSystemOne.id,
    itemData: buildPendingItemData("Test Recipe Seven", "Compendium.module.compendium-name.8kimdf8z83"),
    requirementOptions: new SelectableOptions({
        options: [
            new RequirementOption({
                id: "8kimdf8z83-requirement-1",
                name: "Option 1",
                ingredients: Combination.of(testComponentFour.toReference(), 1)
            })
        ]
    }),
    resultOptions: new SelectableOptions({
        options: [
            new ResultOption({
                id: "8kimdf8z83-result-1",
                name: "Option 1",
                results: Combination.of(testComponentTwo.toReference(), 2)
            })
        ]
    })
})

const allTestRecipes = new Map([
    [testRecipeOne.id, testRecipeOne],
    [testRecipeTwo.id, testRecipeTwo],
    [testRecipeThree.id, testRecipeThree],
    [testRecipeFour.id, testRecipeFour],
    [testRecipeFive.id, testRecipeFive],
    [testRecipeSix.id, testRecipeSix],
    [testRecipeSeven.id, testRecipeSeven]
]);

export {
    allTestRecipes,
    testRecipeOne,
    testRecipeTwo,
    testRecipeThree,
    testRecipeFour,
    testRecipeFive,
    testRecipeSix,
    testRecipeSeven
}

function resetAllTestRecipes() {
    allTestRecipes.forEach(recipe => {
        if (recipe.loaded) {
            recipe.itemData = buildPendingItemData(recipe.itemData.name, recipe.itemData.uuid);
        }
    });
}

export { resetAllTestRecipes }