<!-- Register Page 
 Similar to the login page, but includes field for email, password, and password confirmation with a 'register' button-->
<script lang="ts">
import { useForm, validators, HintGroup, Hint, email, required } from "svelte-use-form";

const form = useForm();

const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!$form.valid) return;
    const { email, password, confirmPassword } = $form.values;

    if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
    }

    try {
        const response = await fetch('api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            // Handle successful registration (e.g., redirect to login)
            console.log('Registration successful');
        } else {
            // Handle registration error (e.g., show error message)
            console.error('Registration failed');
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
};
</script>

<form use:form onsubmit={(e) => { handleSubmit(e); return false; }}>
    <h1>Register</h1>

    <input type="email" name="email" use:validators={[required, email]} />
    <HintGroup for="email">
        <Hint on="required">This is a mandatory field</Hint>
        <Hint on="email" hideWhenRequired>Email is not valid</Hint>
    </HintGroup>

    <input type="password" name="password" use:validators={[required]} />
    <Hint for="password" on="required">This is a mandatory field</Hint>

    <input type="password" name="confirmPassword" use:validators={[required]} />
    <Hint for="confirmPassword" on="required">This is a mandatory field</Hint>

    <button disabled={!$form.valid} type="submit">Register</button>
</form>

