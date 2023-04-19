<template>
  <van-form @submit="onSubmit">
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="'请输入${editUser.editName}'"
      />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import { ref } from "vue";
import myAxios from "../plugins/myAxios.ts";
import {getCurrentUser} from "../service/user";
import {setCurrentUserState} from "../states/user";
import {Toast} from "vant";

const route = useRoute();
const router = useRouter();

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})

const onSubmit = async () => {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    Toast.fail("用户未登录");
    return;
  }

  const res = await myAxios.post('/user/update', {
    'id': currentUser.id,
    [editUser.value.editKey]: editUser.value.currentValue,
  })
  if (res.data > 0 && res.code === 0 ) {
    Toast.success("修改成功！");
    const updateUser = await myAxios.get('/user/current');
    if (updateUser.code === 0) {
      setCurrentUserState(updateUser.data);
    }
    router.back();
  } else {
    Toast.fail("修改错误！");
  }
};

</script>

<style scoped>

</style>