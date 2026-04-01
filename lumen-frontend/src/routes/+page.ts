import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('/api/learningresources');
    const data = await res.text();

    return {
        message: data,
    };
};
