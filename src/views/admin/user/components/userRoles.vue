<template>
    <div class="app-container calendar-list-container">
      <el-transfer v-model="value" :data="list" :button-texts="['撤回','分配']" :titles="['未分配', '已分配']" @change="handleChange"></el-transfer>
    </div>
</template>
<script>
import { userRoles, grant, revoke } from '@/api/admin/role'
export default {
  name: 'UserRoles',
  data() {
    return {
      userId: undefined,
      list: [],
      value: [],
      listLoading: false
    }
  },
  methods: {
    handleFilter() {
      this.getRoles()
    },
    getRoles() {
      this.listLoading = true
      userRoles(this.userId).then(response => {
        this.list = []
        const allRole = response.data.allRoles
        allRole.forEach(role => {
          this.list.push({
            key: role.id,
            label: role.roleName
          })
        })
        const userRole = response.data.userRole
        this.value = []
        if (userRole) {
          userRole.forEach(role => {
            this.value.push(role.id)
          })
        }
        this.listLoading = false
      })
    },
    handleChange(value, direction, movedKeys) {
      const roleIds = movedKeys.join(',')
      if (direction === 'right') {
        // 授权
        grant(this.userId, roleIds)
      } else {
        // 撤权
        revoke(this.userId, roleIds)
      }
      this.getRoles()
    }
  },
  activated() {
  }
}
</script>

