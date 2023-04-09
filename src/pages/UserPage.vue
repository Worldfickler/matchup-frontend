<template>
  <van-cell title="昵称" is-link to="/user/edit" :value="user.username" />
  <van-cell title="账号" :value="user.userAccount" />
  <van-cell title="头像" is-link to="/user/edit">
    <img style="height: 48px" :src="user.avatarUrl" />
  </van-cell>
  <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender', '性别', user.gender)" />
  <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话', user.phone)" />
  <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" />
  <van-cell title="星球编号" :value="user.planetCode" />
  <van-cell title="注册时间" :value="user.createTime.toISOString()" />
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import myAxios from "../plugins/myAxios";

const user = {
  id: 1,
  username: 'fickle',
  userAccount: 'fickle',
  avatarUrl: 'http://qzapp.qlogo.cn/qzapp/101983660/DE2DFA542010DAD2696FC2082D1EE3E7/100',
  gender: '男',
  phone: '123',
  email: '456@qq.com',
  planetCode: '1234',
  createTime: new Date(),
}
const router = useRouter();

// onMounted(async () => {
//   // 上述请求也可以按以下方式完成（可选）
//   const userListData = await myAxios.get('/user/search/tags', {
//     paramsSerializer: params => {
//       return qs.stringify(params, { indices: false })
//     }
//   })
//       .then(function (response) {
//         console.log('/user/search/tags success', response);
//         showSuccessToast('请求成功');
//         console.log(response);
//         return response.data?.data;
//       })
//       .catch(function (error) {
//         console.log('/user/search/tags error', error);
//         showFailToast('请求失败');
//       })
//   if (userListData) {
//     userListData.forEach(user => {
//       if (user.tags) {
//         user.tags = JSON.parse(user.tags);
//       }
//     })
//     userList.value = userListData;
//   }
// })



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