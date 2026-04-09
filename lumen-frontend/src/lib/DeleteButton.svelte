<script lang="ts">
    interface Props {
        resourceId: number;
        onDelete?: () => void;
    }

    const { resourceId, onDelete = null } = $props();
    let icon = "🗑️";

    const handleClick = () => {
        if (onDelete) {
            onDelete();
        }
    };
</script>

<button class="delete-button" onclick={handleClick} title="Delete resource">
    {icon}
</button>

<style>
    .delete-button {
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 6px;
        background-color: #ef4444;
        color: white;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s, transform 0.2s;
    }

    .delete-button:hover {
        background-color: #dc2626;
        transform: scale(1.05);
    }

    .delete-button:active {
        transform: scale(0.95);
    }
</style>
