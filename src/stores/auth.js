import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            id: 0,
            auth: false,
            name: 'Guest',
            email: '',
            avatar: 'https://i.pravatar.cc/150',
            access_level: 0,
            method: 'email',
            access_token: '',
        };
    },
    actions: {
        loginUser(user) {
            this.id = user.uid;
            this.name = user.displayName;
            this.email = user.email;
            this.avatar = user.photoURL;
            this.method = 'Google';
            this.access_level = 100;
            this.auth = true;
        },
        getBasicUser() {
            return {
                id: this.id,
                name: this.name,
                email: this.email,
                avatar: this.avatar,
            };
        },
    },
});
