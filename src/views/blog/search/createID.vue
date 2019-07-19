<template>
  <div class="content">
    <el-alert
      title="身份证号码生成器是按身份证验证规则生成虚拟身份证号，非真实身份证，仅供测试使用，请勿用于非法用途。"
      type="warning"
      style="margin-bottom:20px"
    >
    </el-alert>
    <el-form v-model="form" label-width="10em">
      <el-form-item label="出生地">
        <el-cascader
          v-model="form.region"
          placeholder="试试搜索：北京"
          :options="options"
          :clearable="false"
          :props="{
            value: 'id',
            label: 'name'
          }"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="form.birthday"
          type="date"
          :clearable="false"
          value-format="yyyyMMdd"
          format="yyyy-MM-dd"
          placeholder="选择生日"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" style="width:220px">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生成个数">
        <el-input-number v-model="form.num" style="width:220px" :min="1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createID">
          生成身份证
        </el-button>
      </el-form-item>
      <el-form-item label="生成结果">
        <p v-for="(id, i) in idList" :key="i" style="line-height:32px">
          {{ id }}
        </p>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import { province, city, area } from '@/libs/china_regions'
import province from '@/libs/china_regions/province'
import city from '@/libs/china_regions/city'
import area from '@/libs/china_regions/area'

function createRegions() {
  return province.map(item => {
    if (city[item.id]) {
      item.children = city[item.id].map(v => {
        if (area[v.id]) {
          v.children = area[v.id]
        }
        return v
      })
    }
    return item
  })
}

function createChinaID(strID) {
  // 1到17位相乘系数
  const coefficient = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  // 身份证1到17位分别与系数相乘之和
  var count = coefficient.reduce((accumulator, value, i) => {
    return accumulator + value * parseInt(strID.charAt(i))
  }, 0)
  // 和数除以11的余数
  var remainder = count % 11
  // 余数对应身份证第18位的映射表
  var eighteen = {
    0: '1',
    1: '0',
    2: 'X',
    3: '9',
    4: '8',
    5: '7',
    6: '6',
    7: '5',
    8: '4',
    9: '3',
    10: '2'
  }[remainder]
  return strID + eighteen
}

export default {
  data() {
    return {
      form: {
        region: ['110000', '110100', '110101'],
        birthday: '19920101',
        sex: 1,
        num: 5
      },
      options: createRegions(),
      idList: []
    }
  },
  mounted() {
    this.createID()
  },
  methods: {
    createID() {
      const { region, birthday, sex, num } = this.form
      const idList = new Array(num).fill(0).map(i => {
        const id = region[2] + birthday + this.randomNumberStr(2) + this.randomNumber(sex)
        return createChinaID(id)
      })
      this.idList = idList
    },
    // 随机数字字符串，定长
    randomNumberStr(len = 2) {
      const str = Math.random() + ''
      return str.slice(2, 4)
    },
    // 创建随机奇偶数
    randomNumber(type = 1) {
      const num = Math.round(Math.random() * 8)
      if (type == 1) {
        return num % 2 > 0 ? num : num + 1
      }
      return num % 2 > 0 ? num + 1 : num
    }
  }
}
</script>
