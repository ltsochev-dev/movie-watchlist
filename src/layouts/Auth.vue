<template>
    <div class="container">
        <div class="row">
            <div class="col w-50 mx-auto">
                <h1 class="text-center">Please Login</h1>
                <div class="card text-light bg-dark mb-3 mx-auto">
                    <div class="card-body">
                        <div class="form-group row mb-2">
                            <label for="email" class="col-sm-2">E-Mail Address</label>
                            <div class="col-sm-10">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    inputmode="email"
                                    class="form-control"
                                    v-model="email"
                                />
                            </div>
                        </div>
                        <div class="form-group row mb-2">
                            <label for="password" class="col-sm-2">Password</label>
                            <div class="col-sm-10">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    class="form-control"
                                    v-model="password"
                                />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-auto mx-auto">
                                <button class="btn btn-primary" type="button" @click="emailSign()">
                                    Влез с емайл и парола
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <button
                        class="btn btn-primary"
                        type="button"
                        @click="googleSign()"
                        :disabled="!googleLoginEnabled"
                    >
                        Влез с Google
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from '@vue/reactivity';
import { getRedirectResult, GoogleAuthProvider } from '@firebase/auth';
import { useAuthStore } from '../stores/auth';
import createAuth, { signWithGoogleRedirect, signBasic } from '../utils/createAuth';
import { useRouter } from 'vue-router';

const auth = createAuth();
const authStore = useAuthStore();
const googleLoginEnabled = ref(false);
const email = ref('');
const password = ref('');
const router = useRouter();

getRedirectResult(auth)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        authStore.id = user.uid;
        authStore.name = user.displayName;
        authStore.email = user.email;
        authStore.avatar = user.photoURL;
        authStore.method = 'Google';
        authStore.access_level = 100;
        authStore.auth = true;
        authStore.access_token = token;

        router.push({ path: '/' });
    })
    .catch((e) => {
        googleLoginEnabled.value = true;
    });

const googleSign = () => {
    signWithGoogleRedirect();
};

const emailSign = () => {
    signBasic(email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;

            authStore.id = user.uid;
            authStore.email = user.email;
            authStore.name = user.displayName || user.email;
            authStore.method = 'Email';
            authStore.access_level = 100;
            authStore.auth = true;

            router.push({ path: '/' });
        })
        .catch((e) => {
            alert('Something went wrong');
        });
};
</script>
