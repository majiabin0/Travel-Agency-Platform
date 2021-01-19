<template>
    <div class="filter-container">
        <el-select v-model="provinceCode"ref="provinces" @change="provinceSelected" placeholder="选择省">
            <el-option
                v-for="item in regioneDate"
                :key="item.code"
                :label="item.name"
                :value="item.code">
            </el-option>
        </el-select>
        <el-select v-model="cityCode"ref="city"  @change="citySelected" placeholder="选择市">
            <el-option
                v-for="item in cityDate"
                :key="item.code"
                :label="item.name"
                :value="item.code">
            </el-option>
        </el-select>
        <el-select v-model="countyCode"ref="county" placeholder="选择区县">
            <el-option
                v-for="item in countyData"
                :key="item.code"
                :label="item.name"
                :value="item.code">
            </el-option>
        </el-select>
    </div>
</template>

<script>
import { provinces, subRegion } from '@/api/public/region'
export default {
    name: 'region-select',
    data() {
        return {
            regioneDate: [],
            provinceCode: undefined,
            cityCode: undefined,
            countyCode: undefined,
            cityDate: [],
            countyData: []
        }
    },
    methods: {
        provincesData() {
            provinces().then(response => {
                this.regioneDate = response.data
            })
        },
        provinceSelected() {
            if (this.cityCode) {
                this.cityCode = undefined
            }
            subRegion(this.provinceCode).then(response => {
                if (response.code === 200) {
                this.cityDate = response.data
                }
            })
        },
        citySelected() {
            subRegion(this.cityCode).then(response => {
                if (response.code === 200) {
                this.countyData = response.data
                }
            })
        }
    },
    created() {
        this.provincesData()
    }
}
</script>

