// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

export interface LearningResource {
	id: number;
	title: string;
	description: string;
}

declare global {
	namespace App {
		interface PageData {
			resources: LearningResource[];
		}
		// interface Error {}
		// interface Locals {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
