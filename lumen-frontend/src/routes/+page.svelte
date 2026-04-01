
<script lang="ts">
import type { PageData } from './$types';
import LanguageResource from '$lib/LanguageResource.svelte';
const { data } = $props<{ data: PageData }>();
</script>

<LanguageResource />

<h1>{data.message}</h1>