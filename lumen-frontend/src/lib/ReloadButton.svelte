<script lang="ts">
    interface Props {
        onReload?: () => void;
    }

    const { onReload = null } = $props();
    let icon = "🔄";

    const handleClick = () => {
        if (onReload) {
            onReload();
        }
    };
</script>

<button class="reload-button" onclick={handleClick} title="Reload resources">
    {icon}
</button>

<style>
    .reload-button {
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 6px;
        background-color: #10b981;
        color: white;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s, transform 0.2s;
    }

    .reload-button:hover {
        background-color: #059669;
        transform: scale(1.05);
    }

    .reload-button:active {
        transform: scale(0.95);
    }
</style>