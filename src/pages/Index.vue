<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" />
    </template>
  </van-cell>
  <user-card-list :user-list = "userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="结果为空" />
</template>

<script setup lang="ts">

import { ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios";
import UserCardList from "../components/UserCardList.vue";
import {Toast} from "vant";
import {UserType} from "../models/user";

const userList = ref([]);
const loading = ref(true);

const isMatchMode = ref<boolean>(false);

const loadData = async () => {
  let userListData;
  loading.value = true;
  // 心动模式
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match success', response);
          Toast.success('请求成功');
          console.log(response);
          return response?.data;
        })
        .catch(function (error) {
          console.log('/user/match error', error);
          Toast.fail('请求失败');
        })
    // 普通模式
  } else {
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend success', response);
          Toast.success('请求成功');
          console.log(response);
          return response?.data?.records;
        })
        .catch(function (error) {
          console.log('/user/recommend error', error);
          Toast.fail('请求失败');
        })
  }
  if (userListData) {
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

watchEffect(() => {
  loadData();
})

</script>

<style scoped>

</style>