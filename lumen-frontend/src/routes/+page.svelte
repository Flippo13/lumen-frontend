
<script lang="ts">
import type { LearningResource } from '$lib/../app';
import LearningResourceEditor from '$lib/LearningResource.svelte';
import LearningResourceList from '$lib/LearningResourceList.svelte';

interface PageData {
    resources: LearningResource[];
}

let { data = { resources: [] } }: { data: PageData } = $props();

let editingResource: LearningResource | null = $state(null);

const handleEdit = (resource: LearningResource) => {
    editingResource = resource;
};

const handleEditComplete = () => {
    editingResource = null;
};
</script>

<div class="container">
    <LearningResourceList resources={data.resources} onEdit={handleEdit} />
    <LearningResourceEditor editingResource={editingResource} onEditComplete={handleEditComplete} />
</div>

<style>
    .container {
        padding: 1rem;
    }
</style>