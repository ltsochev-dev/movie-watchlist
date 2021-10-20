<script setup>
const scrollToTop = () => {
    window.scrollTo(0, 0);
};
</script>
<template>
    <!-- Footer -->
    <footer class="footer sticky-footer">
        <div class="container my-auto">
            <div class="d-flex justify-content-between align-items-center">
                <div class="copyright">
                    &copy;
                    <a href="https://ltsochev.com" target="_blank" rel="external">ltsochev.com</a>
                    <span> All rights reserved</span>
                </div>
                <div class="to-the-top">
                    <button class="btn btn-link" type="button" @click="scrollToTop">
                        Back to top
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-chevron-up"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </footer>
    <!-- End of Footer -->
</template>
