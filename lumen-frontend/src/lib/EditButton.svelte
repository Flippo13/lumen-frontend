<script lang="ts">
    interface Props {
        resource?: { id: number; title: string; description: string } | null;
        onEdit?: () => void;
    }

    const { resource = null, onEdit = null } = $props();
    let icon = "✏️";

    const handleClick = () => {
        if (onEdit) {
            onEdit();
        }
    };
</script>

<button class="edit-button" title="Edit resource" onclick={handleClick}>
    {icon}
</button>

<style>
    .edit-button {
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 6px;
        background-color: #f59e0b;
        color: white;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s, transform 0.2s;
    }

    .edit-button:hover {
        background-color: #d97706;
        transform: scale(1.05);
    }

    .edit-button:active {
        transform: scale(0.95);
    }
</style>