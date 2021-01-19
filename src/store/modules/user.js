import { login, logout, getInfo, register, MsgCode, getCode, quickApply, currentApply, updateApply, chooseOrgIdentity, addAgencyDocuments } from '@/api/admin/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  userId: '',
  org: {},
  elements: [],
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
    // console.log(state, 'state')
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMISSION_MENUS: (state, permissionMenus) => {
    state.permissionMenus = permissionMenus
  },
  SET_ORG_MAIN: (state, org) => {
    state.org = org
  },
  SET_ELEMENTS: (state, elements) => {
    state.elements = elements
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    console.log(userInfo, 'userInfo')
    return new Promise((resolve, reject) => {
      login({ username: username, password: password }).then(response => {
        const { data } = response
        console.log(data.token, 'token')
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(response)
        console.log(response, 'response')
      }).catch(error => {
        reject(error)
      })
    })
  },
  register({ commit }, userInfo) {
    const { country, areaCode, phone, code, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ country: country, areaCode: areaCode, phone: phone, code: code, password: password }).then(response => {
        resolve(response)
      })
    })
  },
  recordUser({ commit }, userInfo) {
    commit('SET_USERINFO', userInfo)
    localStorage.setItem('userInfo', userInfo)
  },
  recordId({ commit }, userId) {
    commit('SET_USERID', userId)
    localStorage.setItem('userId', userId)
  },
  recordToken({ commit }, userToken) {
    // commit('SET_TOKEN', userToken)
    localStorage.setItem('token', userToken)
  },
  chooseOrgIdentity({ commit }, userInfo) {
    const { orgId } = userInfo
    console.log(userInfo, '444')
    return new Promise((resolve, reject) => {
      chooseOrgIdentity({ orgId: orgId }).then(response => {
        console.log(response, 'response444')
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(response)
      })
    })
  },
  updateApply({ commit }, userInfo) {
    const { id, orgType, contactsPhone, contactsName, orgName, orgAddress, cityCode, qq, city, businessLicenseFile, exequaturFile, campusName, mainCourse, imgAddress, lng, lat } = userInfo
    console.log(userInfo)
    return new Promise((resolve, reject) => {
      updateApply({ id: id, orgType: orgType, contactsPhone: contactsPhone, contactsName: contactsName, orgName: orgName, orgAddress: orgAddress, cityCode: cityCode, qq: qq, city: city, lng: lng, lat: lat, businessLicenseFile: businessLicenseFile, exequaturFile: exequaturFile, campusName: campusName, mainCourse: mainCourse, imgAddress }).then(response => {
        resolve(response)
      })
    })
  },
  MsgCode({ commit }, userInfo) {
    const { mobilePhone, imageCode, accountType, equipmentCode, optionType } = userInfo
    console.log(userInfo)
    return new Promise((resolve, reject) => {
      MsgCode({ mobilePhone: mobilePhone, imageCode: imageCode, accountType: accountType, equipmentCode: equipmentCode, optionType: optionType }).then(response => {
        resolve(response)
      })
    })
  },
  getCode({ commit }, userInfo) {
    const { optionType, equipmentCode } = userInfo
    console.log(userInfo)
    return new Promise((resolve, reject) => {
      getCode({ equipmentCode: equipmentCode, optionType: optionType }).then(response => {
        console.log(response, 'aaa')
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  quickApply({ commit }, userInfo) {
    const { applyType, contactsPhone, contactsName, orgName, orgAddress, cityCode, qq, city, businessLicenseFile, exequaturFile, campusName, mainCourse, imgAddress, lng, lat } = userInfo
    console.log(userInfo, '5555')
    return new Promise((resolve, reject) => {
      quickApply({ applyType: applyType, contactsPhone: contactsPhone, contactsName: contactsName, orgName: orgName, orgAddress: orgAddress, cityCode: cityCode, qq: qq, city: city, lng: lng, lat: lat, businessLicenseFile: businessLicenseFile, exequaturFile: exequaturFile, campusName: campusName, mainCourse: mainCourse, imgAddress }).then(response => {
        resolve(response)
      })
    })
  },
  addAgencyDocuments({ commit }, userInfo) {
    const { legalPersonName, businessLicenseNumber, orgId, companyName, contactsName, contactsPhone, legalPersonCardProsImg, legalPersonCardConsImg, schoolImg, businessLicenseImg, serviceLicenseImg } = userInfo
    console.log(userInfo, '5555')
    return new Promise((resolve, reject) => {
      addAgencyDocuments({ legalPersonName: legalPersonName, businessLicenseNumber: businessLicenseNumber, orgId: orgId, companyName: companyName, contactsName: contactsName, contactsPhone: contactsPhone, legalPersonCardProsImg: legalPersonCardProsImg, legalPersonCardConsImg: legalPersonCardConsImg, schoolImg: schoolImg, businessLicenseImg: businessLicenseImg, serviceLicenseImg: serviceLicenseImg }).then(response => {
        resolve(response)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        // if (!data) {
        //   reject('Verification failed, please Login again.')
        // }

        const { introduction } = '随便写写先'
        // 用户同一时刻只会登录一个机构
        var roles = []
        data.roles.forEach(role => {
          roles.push(role.roleName)
        })

        const orgMain = data.orgMain
        commit('SET_PERMISSION_MENUS', data.menus)
        const name = data.user.userName
        const avatar = data.user.avatar
        // 用户页面元素数据
        const elements = data.pageElement
        commit('SET_ORG_MAIN', orgMain)
        commit('SET_ELEMENTS', elements)

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  currentApply({ commit, state }) {
    return new Promise((resolve, reject) => {
      currentApply(state).then((response) => {
        console.log(response, 'response')
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSION_MENUS', undefined)
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_PERMISSION_MENUS', undefined)
      removeToken()
      resolve()
    })
  },

  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
