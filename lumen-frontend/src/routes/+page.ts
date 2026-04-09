import type { PageLoad } from './$types';
import type { LearningResource } from '$lib/../app';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('/api/learningresources');
    
    let resources: LearningResource[] = [];
    if (res.ok) {
        try {
            resources = await res.json();
        } catch (error) {
            console.error('Failed to parse learning resources:', error);
        }
    }

    return {
        resources,
    };
};
