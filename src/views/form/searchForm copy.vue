<template>
  <el-card class="col-center">
    <el-form ref="formRef" :model="form" label-width="120px">
      <slot v-for="item in formConfigs">
        <el-form-item :label="item.label" :prop="item.prop">
          <!-- 输入框 -->
          <el-input
            v-if="item.type === 'input'"
            v-model="form[item.prop]"
            :placeholder="`请输入${item.label}`"
          />
          <!-- 下拉框 -->
          <el-select
            v-if="item.type === 'select'"
            v-model="form[item.prop]"
            :placeholder="`请选择${item.label}`"
          >
            <slot v-for="o in item.options">
              <el-option :label="o.label" :value="o.value" />
            </slot>
          </el-select>
          <!-- 日期选择器 -->
          <el-date-picker
            v-if="item.type === 'date'"
            v-model="form[item.prop]"
            type="date"
            :placeholder="`请选择${item.label}`"
          />
        </el-form-item>
      </slot>

      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">查询</el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  {{ form }}
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";

// do not use same name with ref
const form = reactive({});

const formRef = ref<FormInstance>();

const formConfigs = computed(() => {
  return [
    { type: "input", prop: "name", label: "姓名" },
    {
      type: "select",
      prop: "sex",
      label: "性别",
      options: [
        { value: "0", label: "男" },
        { value: "1", label: "女" },
      ],
    },
    { type: "date", prop: "birth", label: "出生日期" },
  ];
});
// 重置表单
const resetForm = (formEl) => {
  console.log(`resetForm - formEl:`, formEl);
  if (!formEl) return;
  formEl.resetFields();
};
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>
