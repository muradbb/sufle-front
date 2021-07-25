<template>
   <div>
              <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item active">
                <router-link
                    active-class="active"
                    :to="{ path: menu.route }"
                    v-for="(menu, index) in menus"
                    :key="index"
                    class="nav-link"
                >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span class="ml-2">{{ menu.name }}</span>
                </router-link>
            </li>

            <hr class="sidebar-divider my-0">

            <li class="nav-item active">
                <a class="nav-link" @click="logout">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Sistemdən çıxış</span>
                    </a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">
        </ul>
        <!-- End of Sidebar -->
   </div>
</template>

<script>
import Swal from "sweetalert2";
import menus from "../../router/menu";
export default {
   name: "Sidebar",
   data() {
       return {
         route: "/",
         menus: menus
      };
   },
   methods: {
      logout() {

          Swal.fire({
                icon: 'question',
                title: 'Are you sure?',
                showCancelButton: true,
                confirmButtonText: `OK`,
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    localStorage.clear();
                    window.location.reload();
                }
            })
        },

    }
}
</script>

<style scoped>
.nav-link {
    cursor: pointer;
}
</style>
