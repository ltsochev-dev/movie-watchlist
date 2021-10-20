<script setup>
import { ref } from '@vue/reactivity';
import { useAttrs } from 'vue-demi';

const emits = defineEmits(['change', 'delete']);
const attrs = useAttrs();
const links = attrs.modelValue;
const editMode = ref(false);
const newLinkUrl = ref('');

const addNew = () => {
    if (newLinkUrl.value.length == 0) return;

    try {
        const url = new URL(newLinkUrl.value);
        links.push(newLinkUrl.value);
        newLinkUrl.value = '';
    } catch (e) {
        console.error(e);
        alert(e.message);
        return false;
    }
};

const storeLinks = () => {
    addNew();
    emits('change', links);
    editMode.value = false;
};
</script>
<template>
    <div class="link-list-module">
        <span class="title">Download links:</span>
        <button class="btn btn-outline-secondary mx-2" v-if="!editMode" @click="editMode = true">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-fill"
                viewBox="0 0 16 16"
            >
                <path
                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                ></path>
            </svg>
            <span class="px-3">Edit list</span>
        </button>
        <div class="link-list-container">
            <ul class="list-unstyled link-list">
                <li
                    class="link-unstyled-list d-flex justify-content-between align-items-center"
                    v-for="link in links"
                    :key="link"
                >
                    <a :href="link" target="_blank">{{ link }}</a>
                    <button
                        class="btn btn-link text-danger"
                        type="button"
                        v-if="editMode"
                        @click="$emit('delete', link)"
                    >
                        &times;
                    </button>
                </li>
                <li class="list-unstyled-item" v-if="editMode">
                    <div class="input-group">
                        <label
                            class="input-group-text bg-dark text-light"
                            id="new-row-lbl"
                            for="basic-url"
                            >Link URL</label
                        >
                        <input
                            type="text"
                            class="form-control"
                            id="basic-url"
                            v-model="newLinkUrl"
                            aria-describedby="new-row-lbl"
                            inputmode="url"
                        />
                    </div>
                    <div class="d-flex justify-content-around my-3">
                        <button class="btn btn-secondary text-white" type="button" @click="addNew">
                            Add New
                        </button>
                        <button
                            class="btn btn-success text-light"
                            type="button"
                            @click="storeLinks"
                        >
                            Store
                        </button>
                        <button
                            class="btn btn-outline-danger text-light"
                            type="button"
                            @click="editMode = false"
                        >
                            Close
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.link-list {
    > li {
        word-break: break-all;
    }
}
</style>
