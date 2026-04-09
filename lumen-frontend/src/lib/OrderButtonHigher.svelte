<script lang="ts">
    interface Props {
        onOrderUp?: () => void;
    }

    const { onOrderUp = null } = $props();
    let icon = "🔼";

    const handleClick = () => {
        if (onOrderUp) {
            onOrderUp();
        }
    };
</script>

<button class="order-button" onclick={handleClick} title="Move up">
    {icon}
</button>

<style>
    .order-button {
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 6px;
        background-color: #3b82f6;
        color: white;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s, transform 0.2s;
    }

    .order-button:hover {
        background-color: #2563eb;
        transform: scale(1.05);
    }

    .order-button:active {
        transform: scale(0.95);
    }
</style>