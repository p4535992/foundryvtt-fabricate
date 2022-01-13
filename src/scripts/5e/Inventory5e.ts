import { ItemData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs";
import {BaseCraftingInventory, Inventory} from "../actor/Inventory";
import {Combination} from "../common/Combination";
import {CraftingComponent} from "../common/CraftingComponent";

// @ts-ignore todo: figure out how to correctly restrict this type
class Inventory5e extends BaseCraftingInventory<ItemData, Actor> {

    constructor(builder: Inventory5e.Builder) {
        super(builder);
    }

    public static builder(): Inventory5e.Builder {
        return new Inventory5e.Builder();
    }

    createFrom(actor: Actor, ownedComponents: Combination<CraftingComponent>): Inventory<ItemData, Actor> {
        return Inventory5e.builder()
            .withActor(actor)
            .withOwnedComponents(ownedComponents)
            .build();
    }

    getOwnedItems(actor: Actor): Item[] {
        return actor.items.contents; //.entries();
    }

    getQuantityFor(item: Item): number {
        return 'quantity' in item.data.data ? item.data.data.quantity : 1;
    }

    setQuantityFor(itemData: ItemData, quantity: number): ItemData {
        if ('quantity' in itemData.data) {
            itemData.data.quantity = quantity;
            return itemData;
        }
        throw new Error(`Type '${typeof itemData}' does not include the required 'quantity' property`);
    }

}

namespace Inventory5e {

export class Inventory5eBuilder extends BaseCraftingInventory.Builder<ItemData, Actor> {

    public build(): Inventory5e {
        return new Inventory5e(this);
    }

}

}

export {Inventory5e}