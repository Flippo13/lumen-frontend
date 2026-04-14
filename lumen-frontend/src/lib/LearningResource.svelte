<script lang="ts">
  import type { LearningResource } from '$lib/../app';

  interface Props {
    editingResource?: LearningResource | null;
    onEditComplete?: () => void;
  }

  const { editingResource = null, onEditComplete = null } = $props();

  let title = $state('');
  let description = $state('');
  let editingId: number | null = $state(null);
  // een comment 
  // Watch for changes to editingResource prop
  $effect(() => {
    if (editingResource) {
      title = editingResource.title;
      description = editingResource.description;
      editingId = editingResource.id;
    }
  });

  function resetForm() {
    title = '';
    description = '';
    editingId = null;
  }

  async function save() {
    const learningResource = {
      title: title,
      description: description
    };

    // Use PUT if editing, POST if creating
    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId
      ? `/api/learningresources/${editingId}`
      : '/api/learningresources';

    const response = await fetch(endpoint, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(learningResource)
    });

    if (!response.ok) {
      console.error('Save failed', response.status, response.statusText);
      return false;
    }

    resetForm();
    if (onEditComplete) {
      onEditComplete();
    }

    return true;
  }
</script>

<style>
  .card {
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .card input {
    padding: 12px;
    border: 2px solid rgba(191, 219, 254, 0.5);
    border-radius: 8px;
    font-size: 16px;
    background-color: rgba(255, 255, 255, 0.9);
    color: #1e3a8a;
  }

  .card input::placeholder {
    color: #60a5fa;
  }

  .card textarea {
    padding: 12px;
    border: 2px solid rgba(191, 219, 254, 0.5);
    border-radius: 8px;
    font-size: 16px;
    resize: vertical;
    min-height: 150px;
    background-color: rgba(255, 255, 255, 0.9);
    color: #1e3a8a;
    font-family: inherit;
  }

  .card textarea::placeholder {
    color: #60a5fa;
  }

  .card-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
  }

  .card button {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #78350f;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
  }

  .card button:active {
    transform: translateY(0);
  }
</style>

<div class="card">
  <input
    placeholder="Title"
    value={title}
    oninput={(event) => title = event.currentTarget.value}
  />

  <textarea
    placeholder="Description"
    value={description}
    oninput={(event) => description = event.currentTarget.value}
  ></textarea>

  <div class="card-actions">
    <button type="button" onclick={save}>
      Save
    </button>
  </div>
</div>
