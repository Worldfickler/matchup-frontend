<template>
  <div v-if="user">
    <van-cell title="个人信息" :value="user?.username" />
    <van-cell title="个人信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user";

// const user = {
//   id: 1,
//   username: 'fickle',
//   userAccount: 'fickle',
//   avatarUrl: 'http://qzapp.qlogo.cn/qzapp/101983660/DE2DFA542010DAD2696FC2082D1EE3E7/100',
//   gender: '男',
//   phone: '123',
//   email: '456@qq.com',
//   planetCode: '1234',
//   createTime: new Date(),
// }

const router = useRouter();
const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
})

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
</script>

<style scoped>

</style>