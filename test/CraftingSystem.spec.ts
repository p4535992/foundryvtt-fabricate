import {expect} from 'chai';
import * as Sinon from 'sinon';

import {CraftingSystem} from "../src/scripts/core/CraftingSystem";
import {Recipe} from "../src/scripts/core/Recipe";
import {Ingredient} from "../src/scripts/core/Ingredient";
import {CraftingComponent} from "../src/scripts/core/CraftingComponent";
import {FabricationAction} from "../src/scripts/core/FabricationAction";
import {ActionType} from "../src/scripts/core/ActionType";
import {Fabricator} from "../src/scripts/core/Fabricator";
import {GameSystemType} from "../src/scripts/core/GameSystemType";
import {Inventory5E} from "../src/scripts/dnd5e/Inventory5E";
import {Inventory} from "../src/scripts/game/Inventory";
import {InventoryRecord} from "../src/scripts/game/InventoryRecord";
import {FabricationOutcome, OutcomeType} from "../src/scripts/core/FabricationOutcome";

const Sandbox: Sinon.SinonSandbox = Sinon.createSandbox();

const mockActorId = 'lxQTQkhiymhGyjzx';
const mockActor = <Actor><unknown>{
    id: mockActorId
};
const mockInventory: Inventory = <Inventory5E><unknown>{
    containsIngredient: Sandbox.stub(),
    addComponent: Sandbox.stub(),
    removeComponent: Sandbox.stub(),
    denormalizedContainedComponents: Sandbox.stub()
}

before(() => {
    Sandbox.restore();
    // @ts-ignore
    global.fabricate = <FabricateModule>{
        inventories: Sandbox.stub(),
        systems: Sandbox.stub()
    };
    // @ts-ignore
    fabricate.inventories.withArgs(mockActorId).returns(mockInventory);
});

beforeEach(() => {
    // @ts-ignore
    global.game = {
        actors: {
            get: Sandbox.stub()
        }
    };
    // @ts-ignore
    game.actors.get.withArgs(mockActorId).returns(mockActor);

});

describe('Crafting System |', () => {

    describe('Create |', () => {

        it('Should create a Crafting System', () => {

            const mockFabricator = <Fabricator><unknown>{
                fabricateFromComponents: Sandbox.stub(),
                fabricateFromRecipe: Sandbox.stub()
            };
            // @ts-ignore
            mockFabricator.fabricateFromRecipe.returns({});

            let compendiumKey = 'fabricate.fabricate-test';
            let testSystem = CraftingSystem.builder()
                .withName('Test System')
                .withCompendiumPackKey(compendiumKey)
                .withSupportedGameSystem(GameSystemType.DND5E)
                .withFabricator(mockFabricator)
                .withRecipe(Recipe.builder()
                    .withName('Recipe: Mud Pie')
                    .withPartId('4iHqWSLTMFjPbpuI')
                    .withIngredient(Ingredient.builder()
                        .isConsumed(true)
                        .withQuantity(2)
                        .withComponent(CraftingComponent.builder()
                            .withName('Mud')
                            .withPartId('tCmAnq9zcESt0ULf')
                            .withSystemId(compendiumKey)
                            .build())
                        .build())
                    .withIngredient(Ingredient.builder()
                        .isConsumed(true)
                        .withQuantity(1)
                        .withComponent(CraftingComponent.builder()
                            .withName('Sticks')
                            .withPartId('arWeEYkLkubimBz3')
                            .withSystemId(compendiumKey)
                            .build())
                        .build())
                    .withResult(FabricationAction.builder()
                        .withAction(ActionType.ADD)
                        .withQuantity(1)
                        .withComponent(CraftingComponent.builder()
                            .withName('Mud Pie')
                            .withPartId('nWhTa8gD1QL1f9O3')
                            .withSystemId(compendiumKey)
                            .build())
                        .build())
                    .build())
                .build();

            expect(testSystem.name).to.equal('Test System');
            expect(testSystem.compendiumPackKey).to.equal('fabricate.fabricate-test');
            expect(testSystem.supportedGameSystems).to.contain('dnd5e');
            expect(testSystem.supports(GameSystemType.DND5E)).to.be.true;
            expect(testSystem.recipes.length).to.equal(1);
            expect(testSystem.recipes).to.deep.include.members([
                Recipe.builder()
                    .withName('Recipe: Mud Pie')
                    .withPartId('4iHqWSLTMFjPbpuI')
                    .withIngredient(Ingredient.builder()
                        .withComponent(CraftingComponent.builder()
                            .withName('Mud')
                            .withSystemId('fabricate.fabricate-test')
                            .withPartId('tCmAnq9zcESt0ULf')
                            .build())
                        .withQuantity(2)
                        .isConsumed(true)
                        .build())
                    .withIngredient(Ingredient.builder()
                        .withComponent(CraftingComponent.builder()
                            .withName('Sticks')
                            .withPartId('arWeEYkLkubimBz3')
                            .withSystemId('fabricate.fabricate-test')
                            .build())
                        .withQuantity(1)
                        .isConsumed(true)
                        .build())
                    .withResult(FabricationAction.builder()
                        .withAction(ActionType.ADD)
                        .withQuantity(1)
                        .withComponent(CraftingComponent.builder()
                            .withName('Mud Pie')
                            .withPartId('nWhTa8gD1QL1f9O3')
                            .withSystemId('fabricate.fabricate-test')
                            .build())
                        .build())
                    .build()
            ]);
        });

        it('Should craft a recipe using the System\'s Fabricator', async () => {

            let mockFabricator = <Fabricator>{
                fabricateFromComponents: Sandbox.stub(),
                fabricateFromRecipe: Sandbox.stub()
            };

            let compendiumKey = 'fabricate.fabricate-test';
            const twoMud = Ingredient.builder()
                .isConsumed(true)
                .withQuantity(2)
                .withComponent(CraftingComponent.builder()
                    .withName('Mud')
                    .withPartId('tCmAnq9zcESt0ULf')
                    .withSystemId(compendiumKey)
                    .build())
                .build();
            const oneStick = Ingredient.builder()
                .isConsumed(true)
                .withQuantity(1)
                .withComponent(CraftingComponent.builder()
                    .withName('Sticks')
                    .withPartId('arWeEYkLkubimBz3')
                    .withSystemId(compendiumKey)
                    .build())
                .build();
            const mudPie = FabricationAction.builder()
                .withAction(ActionType.ADD)
                .withQuantity(1)
                .withComponent(CraftingComponent.builder()
                    .withName('Mud Pie')
                    .withPartId('nWhTa8gD1QL1f9O3')
                    .withSystemId(compendiumKey)
                    .build())
                .build();

            const mudPieRecipe = Recipe.builder()
                .withName('Recipe: Mud Pie')
                .withPartId('4iHqWSLTMFjPbpuI')
                .withIngredient(twoMud)
                .withIngredient(oneStick)
                .withResult(mudPie)
                .build();

            let testSystem = CraftingSystem.builder()
                .withName('Test System')
                .withCompendiumPackKey(compendiumKey)
                .withSupportedGameSystem(GameSystemType.DND5E)
                .withFabricator(mockFabricator)
                .withRecipe(mudPieRecipe)
                .build();

            const mockInventory: Inventory = <Inventory5E><unknown>{
                containsIngredient: Sandbox.stub(),
                addComponent: Sandbox.stub(),
                removeComponent: Sandbox.stub(),
                denormalizedContainedComponents: Sandbox.stub()
            }
            // @ts-ignore
            mockInventory.containsIngredient.withArgs(twoMud).returns(true);
            // @ts-ignore
            mockInventory.containsIngredient.withArgs(oneStick).returns(true);
            // @ts-ignore
            mockInventory.addComponent.withArgs(mudPie).returns(InventoryRecord.builder()
                .withFabricateItem(mudPie.component)
                .withTotalQuantity(mudPie.quantity)
                .withActor(mockActor)
                .build());
            // @ts-ignore
            mockInventory.removeComponent.returns(true);
            // @ts-ignore
            mockInventory.denormalizedContainedComponents.returns([]);

            const removeOneStick = FabricationAction.builder()
                .withComponent(oneStick.component)
                .withQuantity(oneStick.quantity)
                .withAction(ActionType.REMOVE)
                .build();
            const removeTwoMud = FabricationAction.builder()
                .withComponent(twoMud.component)
                .withQuantity(twoMud.quantity)
                .withAction(ActionType.REMOVE)
                .build();

            // @ts-ignore
            mockFabricator.fabricateFromRecipe.returns(new FabricationOutcome(OutcomeType.SUCCESS, 'Test user message', [removeOneStick, removeTwoMud, mudPie]));

            const fabricationOutcome: FabricationOutcome = await testSystem.craft(mockActor.id, mudPieRecipe.partId);
            expect(fabricationOutcome.actions.length).to.equal(3);
            expect(fabricationOutcome.actions).to.contain.members([removeOneStick, removeTwoMud, mudPie]);

        })

    });

});