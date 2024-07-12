<template>
  <router-view />
</template>

<script setup>
import {onMounted} from "vue";
import {useRouter} from "vue-router";
const router = useRouter();
onMounted(() => {
  router.push('/home');
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
