<script lang="ts">
    import {key} from "../CraftingSystemManagerApp";
    import Properties from "../../../scripts/Properties";
    import {DefaultDocumentManager} from "../../../scripts/foundry/DocumentManager";
    import {getContext} from "svelte";
    import {ComponentSearchStore} from "../../stores/ComponentSearchStore";

    const localizationPath = `${Properties.module.id}.CraftingSystemManagerApp.tabs.components`;
    const {
        selectedCraftingSystem,
        craftingComponents,
        localization,
        craftingComponentEditor,
        selectedComponent,
        loading
    } = getContext(key);

    const componentSearchResults = new ComponentSearchStore({availableComponents: craftingComponents});
    const searchTerms = componentSearchResults.searchTerms;

    function clearSearch() {
        componentSearchResults.clear();
    }

    async function importComponent(event) {
        $loading = true;
        await craftingComponentEditor.importComponent(event, $selectedCraftingSystem);
        $loading = false;
    }

    function selectComponent(component) {
        $selectedComponent = component;
    }

    async function deleteComponent(event, component) {
        $loading = true;
        await craftingComponentEditor.deleteComponent(event, component, $selectedCraftingSystem);
        $loading = false;
    }

    async function disableComponent(component) {
        component.isDisabled = true;
        $loading = true;
        await craftingComponentEditor.saveComponent(component, $selectedCraftingSystem);
        const message = localization.format(
            `${localizationPath}.component.disabled`,
            {
                componentName: component.name
            }
        );
        ui.notifications.info(message);
        $loading = false;
    }

    async function enableComponent(component) {
        component.isDisabled = false;
        $loading = true;
        await craftingComponentEditor.saveComponent(component, $selectedCraftingSystem);
        const message = localization.format(
            `${localizationPath}.component.enabled`,
            {
                componentName: component.name
            }
        );
        ui.notifications.info(message);
        $loading = false;
    }

    async function toggleComponentDisabled(component) {
        return component.isDisabled ? enableComponent(component) : disableComponent(component);
    }

    async function duplicateComponent(component) {
        $loading = true;
        await craftingComponentEditor.duplicateComponent(component, $selectedCraftingSystem);
        $loading = false;
    }

    async function openItemSheet(component) {
        const document = await new DefaultDocumentManager().getDocumentByUuid(component.itemUuid);
        await document.sourceDocument.sheet.render(true);
    }

</script>
{#if $selectedCraftingSystem}
<div class="fab-system-components fab-column">
    <div class="fab-hero-banner fab-row">
        <img src="{Properties.ui.banners.componentEditor}" >
    </div>
    {#if !$selectedCraftingSystem.isLocked}
        <div class="fab-tab-header fab-row">
            <h2>{localization.format(`${localizationPath}.addNew`, { systemName: $selectedCraftingSystem?.name })}</h2>
        </div>
        <div class="fab-drop-zone fab-add-component" on:drop|preventDefault={importComponent}>
            <i class="fa-solid fa-plus"></i>
        </div>
    {/if}
    <div class="fab-tab-header fab-row">
        <h2>{localization.format(`${localizationPath}.search.title`, { systemName: $selectedCraftingSystem?.name })}</h2>
    </div>
    <div class="fab-row fab-columns fab-component-search">
        <div class="fab-column fab-row fab-search fab-component-name">
            <p class="fab-label fab-inline">{localization.localize(`${localizationPath}.search.name`)}</p>
            <input type="text" bind:value={$searchTerms.name} />
            <button class="clear-search" data-tooltip={localization.localize(`${localizationPath}.search.clear`)} on:click={clearSearch}><i class="fa-regular fa-circle-xmark"></i></button>
        </div>
        <div class="fab-column fab-row fab-has-essences">
            <p class="fab-label fab-inline">{localization.localize(`${localizationPath}.search.hasEssences`)}</p>
            <input type="checkbox" bind:checked={$searchTerms.hasEssences} />
        </div>
        <div class="fab-column fab-row fab-has-salvage">
            <p class="fab-label fab-inline">{localization.localize(`${localizationPath}.search.hasSalvage`)}</p>
            <input type="checkbox" bind:checked={$searchTerms.hasSalvage} />
        </div>
    </div>
    {#if $craftingComponents.length > 0}
        <div class="fab-row">
            <div class="fab-component-grid fab-grid-4">
                {#each $componentSearchResults as component}
                    <div class="fab-component" class:fab-disabled={component.isDisabled} class:fab-error={component.hasErrors}>
                        <div class="fab-component-name">
                            <p>{component.name}</p>
                            {#if component.hasErrors}<i class="fa-solid fa-circle-exclamation"></i>{/if}
                        </div>
                        <div class="fab-columns fab-component-preview">
                            {#if !component.hasErrors}
                                <div class="fab-column fab-component-image" data-tooltip="{localization.localize(`${localizationPath}.component.buttons.openSheet`)}" on:click={openItemSheet(component)}>
                                    <img src={component.imageUrl} alt={component.name} />
                                </div>
                            {:else}
                                <div class="fab-column fab-component-image" data-tooltip="{localization.localizeAll(`${localizationPath}.component.errors`, component.errorCodes)}">
                                    <img src={component.imageUrl} alt={component.name} />
                                </div>
                            {/if}
                            {#if !$selectedCraftingSystem.isLocked}
                            <div class="fab-column fab-component-editor-buttons">
                                <button class="fab-edit-component" on:click|preventDefault={selectComponent(component)} data-tooltip="{localization.localize(`${localizationPath}.component.buttons.edit`)}"><i class="fa-solid fa-file-pen"></i></button>
                                <button class="fab-edit-component" on:click|preventDefault={event => deleteComponent(event, component)} data-tooltip="{localization.localize(`${localizationPath}.component.buttons.delete`)}"><i class="fa-solid fa-trash fa-fw"></i></button>
                                <button class="fab-edit-component" on:click|preventDefault={toggleComponentDisabled(component)} data-tooltip="{localization.localize(`${localizationPath}.component.buttons.disable`)}"><i class="fa-solid fa-ban"></i></button>
                                <button class="fab-edit-component" on:click|preventDefault={duplicateComponent(component)} data-tooltip="{localization.localize(`${localizationPath}.component.buttons.duplicate`)}"><i class="fa-solid fa-paste fa-fw"></i></button>
                            </div>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        {#if $componentSearchResults.length === 0}
            <div class="fab-no-search-results"><p>{localization.localize(`${localizationPath}.search.noMatches`)}</p></div>
        {/if}
    {:else}
        <div class="fab-no-components">
            <p>{localization.localize(`${localizationPath}.noneFound`)}</p>
            {#if !$selectedCraftingSystem.isLocked}<p>{localization.localize(`${localizationPath}.create`)}</p>{/if}
        </div>
    {/if}
</div>
{/if}