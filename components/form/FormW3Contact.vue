<script lang="ts" setup>

/**
 * TODO: If honeypot does not work against bots then configure for captcha.
 * Web3Forms
 */

const form = ref({
    access_key: useRuntimeConfig().public.formApi,
    subject: "Email from thomasjt.com",
    name: "",
    email: "",
    message: "",
})

const result = ref<string>("")
const status = ref<string>("ready")

const dict: Map<string, string> = new Map()
dict.set('ready', 'Tell me.')
dict.set('loading', 'Sending.')
dict.set('success', 'Thanking You. Will Read!')
dict.set('error', 'Ooops, error. Contact Dev!')

const message = computed(() => {
    return dict.get(status.value)
})

const submitForm = async () => {
    try {
        status.value = "loading"
        const response = await $fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: form.value,
        })
        result.value = response.message
        if (response.success) {
            status.value = "success"
        } else {
            status.value = "error"
        }
    } catch (error) {
        status.value = "error"
        result.value = "Something went wrong!"
    } finally {
        // Reset form after submission
        form.value.name = ""
        form.value.email = ""
        form.value.message = ""

        // Clear result and status after 5 seconds
        setTimeout(() => {
            result.value = ""
            status.value = "ready"
        }, 5000)
    }
}
</script>

<template>
    <form @submit.prevent="submitForm">
        <h2>{{ message }}</h2>
        <label for="name">
            <input type="text" name="name" id="name" v-model="form.name" placeholder="Name" required />
        </label>
        <label for="email">
            <input type="email" name="email" id="email" v-model="form.email" placeholder="Email" required />
        </label>
        <label for="message">
            <textarea name="message" id="message" v-model="form.message" rows="6" placeholder="Words"
                required></textarea>
        </label>
        <button type="submit">Go</button>
        <input type="checkbox" name="botcheck" class="hidden" style="display: none;">
    </form>
</template>

<style lang="scss" scoped>
// Have to get back to portfolio build or I would optimised with functions/mixins more!

h2 {
    font-family: $sans-text;
    color: $secondary;
}

::placeholder {
    font-size: 16px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 300px;
    padding-top: 50px;
    margin: 0 auto;
    user-select: none;
}

form input,
form textarea,
form button {
    border-radius: 10px;
    border: 1px solid $secondary;
    background-color: $primary;
    color: $secondary;
    font-family: $sans-text;
}

form input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
}

form textarea {
    width: 100%;
    padding: 10px;
    resize: none;
    font-size: 16px;
}

form button {
    width: 70px;
    padding: 7px;
    text-align: center;
    font-weight: 400;
    transition: background-color 0.3s ease-in-out;
}

form button:hover {
    background-color: $accent;
}
</style>