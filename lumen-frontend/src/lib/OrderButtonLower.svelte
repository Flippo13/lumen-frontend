// This file is a Svelte component that represents an "Order Button" with a lower order (indicated by the down arrow icon). The component uses TypeScript for type safety and defines a simple variable to hold the icon representation.
// the component is used in the LearningResourceCompact.svelte component, where it is used to move a learning resource down in the list of resources. When the button is clicked, it will trigger a function that changes the order of the resources in the list, moving the selected resource down by one position.
// it is a small rectengular button with the icon in the middle.
<script lang="ts">
    let icon = "🔽";

    const { onOrderDown = null } = $props();

    const handleClick = () => {
        if (onOrderDown) {
            onOrderDown();
        }
    };
</script>

<button class="order-button" onclick={handleClick} title="Move down">
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