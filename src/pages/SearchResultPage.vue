<template>
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="`${user.username} (${user.planetCode})`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{tag}}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
</template>

<script setup>

  import {ref} from "vue";
  import {useRoute} from "vue-router";

  const route = useRoute();

  const { tags } = route.query;

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

  const userList = ref([mockUser]);



</script>

<style scoped>

</style>