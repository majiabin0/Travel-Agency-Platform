<template>
    <div class="app-container calendar-list-container">
      <el-row>
        <el-col :span="12" style="margin-top: 15px">
          <el-tree
        :data="resourceData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checkedKeys"
        :check-on-click-node="false"
        :props="resourcesProps"
        ref="resourceTree"
        @node-click="getNodeData">
      </el-tree>
        </el-col>
        <el-col :span="12" style="margin-top: 15px">
            <el-checkbox-group v-model="elementSelectedId">
              <el-checkbox v-for="element in elementData" :label="element.id" :key="element.id" @change="checked =>elementChange(element, checked)">{{element.resourceName}}</el-checkbox>
            </el-checkbox-group>
        </el-col>
      </el-row>

    </div>
</template>
<script>
import { roleResource } from '@/api/admin/role'
export default {
  name: 'RoleResource',
  data() {
    return {
      roleId: undefined,
      resourceData: [],
      checkedKeys: [],
      resourcesProps: {
        children: 'subMenus',
        label: 'resourceName'
      },
      elementSelectedId: [],
      elementData: []
    }
  },
  methods: {
    roleResourceData() {
      this.resourceData = []
      this.elementSelectedId = []
      this.checkedKeys = []
      if (!this.roleId) {
        return
      }
      roleResource(this.roleId).then(response => {
        this.resourceData = response.data
        response.data.forEach(element => {
          if (element.greant) {
            this.checkedKeys.push(element.id)
          }
          if (element.subMenus && element.subMenus.length > 0) {
            // 二级菜单
            element.subMenus.forEach(menu => {
              if (menu.greant === 1) {
                this.checkedKeys.push(menu.id)
              }
              if (menu.subElements && menu.subElements.length > 0) {
                // 页面元素，一级菜单暂时不会有页面元素
                menu.subElements.forEach(element => {
                  if (element.greant) {
                    this.elementSelectedId.push(element.id)
                  }
                })
              }
            })
          }
        })
      })
    },
    getNodeData(data) {
      this.elementData = []
      if (data.subElements && data.subElements.length > 0) {
        this.elementData = data.subElements
      }
    },
    elementChange(data, value) {
      if (value) {
        const tree = this.$refs.resourceTree
        const currentData = this.$refs.resourceTree.getCurrentNode()
        const currentNode = tree.getNode(currentData)
        // 选中页面元素所属的菜单
        if (currentNode && !currentNode.checked) {
          this.checkedKeys.push(currentNode.key)
          tree.setCheckedKeys(this.checkedKeys)
        }
      }
    }
  }
}
</script>
