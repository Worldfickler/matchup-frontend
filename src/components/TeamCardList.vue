<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        thumb="http://qzapp.qlogo.cn/qzapp/101983660/DE2DFA542010DAD2696FC2082D1EE3E7/100"
        :title="`${team.name}`"
    >
      <template #tags>
        <van-tag plain type="primary" style="margin-right: 8px; margin-top: 8px">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{'最大人数' + team.maxNum}}
        </div>
        <div>
          {{'过期时间' + team.expireTime}}
        </div>
        <div>
          {{'创建时间' + team.createTime}}
        </div>
      </template>
      <template #footer>
        <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" size="mini" plain type="primary" @click="doJoinTeam(team.id)">加入队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" size="mini" plain type="primary" @click="doUpdateTeam(team.id)">更新队伍</van-button>
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="mini" plain type="primary" @click="doQuitTeam(team.id)">退出队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" size="mini" plain type="danger" @click="doDeleteTeam(team.id)">解散队伍</van-button>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">

import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user";
import {useRouter} from "vue-router";

const router = useRouter();

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = defineProps<TeamCardListProps>();

const currentUser = ref();
// 获取用户信息
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

// 队伍列表加入队伍
const doJoinTeam = async(id: number) =>{
  const res = await myAxios.post("/team/join",{
    teamId : id
  });
  //@ts-ignore
  if (res?.code === 0){
    Toast.success("加入成功")
  }else {
    //@ts-ignore
    Toast.fail("加入失败" + (res.description ? `， ${res.description} `:''));
  }
}

/**
 * 更新队伍
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query:{
      id,
    }
  })
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post("/team/quit",{
    teamId : id
  });
  //@ts-ignore
  if (res?.code === 0){
    Toast.success("操作成功")
  }else {
    //@ts-ignore
    Toast.fail("操作失败" + (res.description ? `， ${res.description} `:''));
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post("/team/delete",{
     id,
  });
  //@ts-ignore
  if (res?.code === 0){
    Toast.success("操作成功")
  }else {
    //@ts-ignore
    Toast.fail("操作成功" + (res.description ? `， ${res.description} `:''));
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img){
  height: 128px;
  object-fit: unset;
}
</style>