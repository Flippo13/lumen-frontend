<!-- Sign In Page 
 handles all the sign-in functionality using the routes:
 POST /login, POST /register, 
 if login is successful, redirect to the root page '/'-->
<script lang="ts">
import { useForm, validators, HintGroup, Hint, email, required } from "svelte-use-form"; 

const form = useForm();  

const handleClick = async () => {
    if (!$form.valid) return;

    const { email, password } = $form.values;

    try {
        const response = await fetch('api/login?useCookies=true&useSessionCookies=true', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            // Handle successful login (e.g., redirect to dashboard)
            window.location.href = '/';
            console.log('Login successful!');
        } else {
            // Handle login error (e.g., show error message)
            console.error('Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
};

</script>
<form use:form>
  <h1>Login</h1>

  <input type="email" name="email" use:validators={[required, email]} />
  <HintGroup for="email">
    <Hint on="required">This is a mandatory field</Hint>
    <Hint on="email" hideWhenRequired>Email is not valid</Hint>
  </HintGroup>

  <input type="password" name="password" use:validators={[required]} />
  <Hint for="password" on="required">This is a mandatory field</Hint>

  <button disabled={!$form.valid} onclick={handleClick}>Login</button>
</form>
