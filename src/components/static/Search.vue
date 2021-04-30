<template>
    <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <!-- Sidebar Toggle (Topbar) -->
            <button id="sidebarToggleTop" class="btn btn-link rounded-circle mr-3" @click="toggle">
                <i class="fa fa-bars"></i>
            </button>
        </nav>
        <!-- End of Topbar -->
</template>

<script>
export default {
    name: "home",
    data() {
        return {

        }
    },
    methods: {
        toggle() {
              $("body").toggleClass("sidebar-toggled");
                $(".sidebar").toggleClass("toggled");
                if ($(".sidebar").hasClass("toggled")) {
                $('.sidebar .collapse').collapse('hide');
                };
          }
    }
}
    
</script>

<style scoped>

</style>
