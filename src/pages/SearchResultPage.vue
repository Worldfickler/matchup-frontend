<template>
  <user-card-list :user-list = "userList" />
  <van-empty v-if="!userList || userList.length < 1" description="结果为空" />
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";
import {Toast} from "vant";

  const route = useRoute();

  const { tags } = route.query;

  const userList = ref([]);

  onMounted(async () => {
    // 上述请求也可以按以下方式完成（可选）
    const userListData = await myAxios.get('/user/search/tags', {
      params: {
        tagNameList: tags
      },
      paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
      }
    })
        .then(function (response) {
          console.log('/user/search/tags success', response);
          Toast.success('请求成功');
          console.log(response);
          return response?.data;
        })
        .catch(function (error) {
          console.log('/user/search/tags error', error);
          Toast.fail('请求失败');
        })
    if (userListData) {
      userListData.forEach(user => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      })
      userList.value = userListData;
    }
  })

  const mockUser = {
    id: 12332,
    username: 'fickler',
    userAccount: '112221',
    avatarUrl: 'https://profile-avatar.csdnimg.cn/8dbe1bf39f1942a98ed117ed7900f103_qq_52354698.jpg!1',
    profile: '这是一条个人简介...',
    gender: 0,
    phone: '12121212121',
    email: '1221112112@qq.com',
    userStatus: 0,
    userRole: 0,
    planetCode: '2332',
    tags: ['java', 'c++', 'emo'],
    createTime: new Date(),
  }

</script>

<style scoped>

</style>