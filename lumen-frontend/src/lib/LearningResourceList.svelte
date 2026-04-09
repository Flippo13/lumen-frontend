<script lang="ts">
    import type { LearningResource } from '$lib/../app';
    import ReloadButton from "./ReloadButton.svelte";
    import LearningResourceCompact from "./LearningResourceCompact.svelte";

    interface Props {
        resources: LearningResource[];
        onEdit?: ((resource: LearningResource) => void) | null;
    }

    let { resources = [], onEdit = null }: Props = $props();
    
    let swappedIds: Set<number> = new Set();

    // Handle order swap between two resources
    const handleOrderSwap = async (id1: number, id2: number) => {
        try {
            const response = await fetch(`/api/learningresources/swap/${id1}/${id2}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id1, id2 }),
            });

            if (!response.ok) {
                console.error('Failed to swap resources');
                return;
            }

            // Find indices of both resources
            const index1 = resources.findIndex((r: LearningResource) => r.id === id1);
            const index2 = resources.findIndex((r: LearningResource) => r.id === id2);

            if (index1 !== -1 && index2 !== -1) {
                // Swap positions - create new array to trigger Svelte reactivity
                const newResources = [...resources];
                [newResources[index1], newResources[index2]] = [newResources[index2], newResources[index1]];
                resources = newResources;
                
                // Show success feedback
                swappedIds = new Set([id1, id2]);
                setTimeout(() => {
                    swappedIds = new Set();
                }, 1500);
            }
        } catch (error) {
            console.error('Error swapping resources:', error);
        }
    };

    // Handle delete resource
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/learningresources/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                console.error('Failed to delete resource');
                return;
            }

            // Remove from list
            resources = resources.filter((r: LearningResource) => r.id !== id);
        } catch (error) {
            console.error('Error deleting resource:', error);
        }
    };

    // Handle reload
    const handleReload = async () => {
        try {
            const response = await fetch('/api/learningresources');
            if (response.ok) {
                const freshResources = await response.json();
                resources = freshResources;
            }
        } catch (error) {
            console.error('Error reloading resources:', error);
        }
    };
</script>

<div class="list-container">
    <div class="controls">
        <ReloadButton onReload={handleReload} />
    </div>
    
    <div class="resources-wrapper">
        {#each resources as resource (resource.id)}
            <div class:swapped={swappedIds.has(resource.id)}>
                <LearningResourceCompact
                    resource={resource}
                    onOrderUp={() => {
                        const index = resources.findIndex(r => r.id === resource.id);
                        if (index > 0) {
                            handleOrderSwap(resource.id, resources[index - 1].id);
                        }
                    }}
                    onOrderDown={() => {
                        const index = resources.findIndex(r => r.id === resource.id);
                        if (index < resources.length - 1) {
                            handleOrderSwap(resource.id, resources[index + 1].id);
                        }
                    }}
                    onDelete={() => handleDelete(resource.id)}                onEdit={() => {
                        if (onEdit) {
                            onEdit(resource);
                        }
                    }}                /></div>
        {/each}
    </div>
</div>

<style>
    .list-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .controls {
        display: flex;
        gap: 0.5rem;
    }

    .resources-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    @keyframes swapHighlight {
        0% {
            background-color: #ffd700;
            transform: scale(1.02);
        }
        100% {
            background-color: transparent;
            transform: scale(1);
        }
    }

    .swapped {
        animation: swapHighlight 1.5s ease-in-out;
    }

    div :global(.learning-resource) {
        border: 1px solid #d1d5db;
        border-radius: 8px;
        overflow: hidden;
        background-color: white;
    }
</style>