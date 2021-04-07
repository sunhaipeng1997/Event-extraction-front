<template>
    <el-container style="height: 100%;">

        <el-header class="header" style="height: 80px">
            <div>
                <h1>事件抽取系统 <i class="el-icon-arrow-right"></i></h1>
                <el-breadcrumb class="beard-crumb"
                               separator-class="el-icon-arrow-right">
                    <transition name="el-zoom-in-top">
                        <el-breadcrumb-item>
                            <span class="title">{{this.$route.name}}</span>
                        </el-breadcrumb-item>
                    </transition>
                </el-breadcrumb>
            </div>
            <div>
            </div>
        </el-header>

        <el-container style="height:100%; border: 1px solid #eee">

            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

                <el-menu router :default-openeds="['0', '1']">
                    <el-submenu v-for="(item,index) in $router.options.routes" :key="index" :index="index+''"
                                v-if="item.show">
                        <template slot="title">{{item.name}}</template>
                        <el-menu-item v-for="(item2,index2) in item.children" :key="index2" :index="item2.path"
                                      :class="$route.path==item2.path?'is-active':''">{{item2.name}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-aside>

            <el-main>
                <router-view></router-view>
            </el-main>

        </el-container>
    </el-container>
    <!--    <el-container style="height:100%; border: 1px solid #eee">-->

    <!--        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">-->

    <!--            <el-menu router :default-openeds="['0', '1']">-->
    <!--                <el-submenu v-for="(item,index) in $router.options.routes" :key="index" :index="index+''" v-if="item.show">-->
    <!--                    <template slot="title">{{item.name}}</template>-->
    <!--                    <el-menu-item v-for="(item2,index2) in item.children" :key="index2" :index="item2.path"-->
    <!--                                  :class="$route.path==item2.path?'is-active':''">{{item2.name
    }}</el-menu-item>-->
    <!--                </el-submenu>-->
    <!--            </el-menu>-->

    <!--        </el-aside>-->

    <!--        <el-main>-->
    <!--            <router-view></router-view>-->
    <!--        </el-main>-->

    <!--    </el-container>-->

</template>

<script>
    export default {
        name: "Index",
        methods: {

        },
        created() {
            console.log(this.$route.meta.name);
        }
    }
</script>

<style scoped>
.header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    background: {
    color: #3d5a80;;
};

div:nth-child(1) {
    display: flex;
}

.title {
    color: white;
    line-height: 80px;
}
}
</style>
