<script lang="ts">
import type { LearningResource } from '$lib/../app';
import EditButton from "./EditButton.svelte";
import DeleteButton from "./DeleteButton.svelte";
import OrderButtonHigher from "./OrderButtonHigher.svelte";
import OrderButtonLower from "./OrderButtonLower.svelte";

interface Props {
    resource: LearningResource;
    onOrderUp?: () => void;
    onOrderDown?: () => void;
    onDelete?: () => void;
    onEdit?: (() => void) | null;
}

const { resource, onOrderUp, onOrderDown, onDelete, onEdit } = $props();

</script>

<div class="compact-resource">
    <div class="resource-content">
        <h3 class="title">{resource.title}</h3>
        <p class="description">{resource.description}</p>
    </div>
    
    <div class="button-group">
        <EditButton resource={resource} onEdit={onEdit} />
        <OrderButtonHigher onOrderUp={onOrderUp} />
        <OrderButtonLower onOrderDown={onOrderDown} />
        <DeleteButton resourceId={resource.id} onDelete={onDelete} />
    </div>
</div>

<style>
    .compact-resource {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
        background-color: white;
        width: 100%;
        box-sizing: border-box;
        transition: background-color 0.2s;
    }

    .compact-resource:hover {
        background-color: #f9fafb;
    }

    .compact-resource:last-child {
        border-bottom: none;
    }

    .resource-content {
        flex-grow: 1;
    }

    .title {
        margin: 0 0 0.5rem 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #1f2937;
    }

    .description {
        margin: 0;
        font-size: 0.875rem;
        color: #6b7280;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-clamp: 3;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .button-group {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
        flex-wrap: wrap;
    }
</style>