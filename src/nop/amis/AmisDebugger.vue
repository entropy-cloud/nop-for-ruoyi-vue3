<!--
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
-->
<template>
  <span class="my4 amis-debugger">
    <el-button type="primary" shape="circle" title="Schema Json Editor" @click="openSchemaEditor">S</el-button>
    <el-button type="danger" shape="circle" title="Amis Visual Designer" v-if="path"
       danger @click="openAmisEditor">V</el-button>
    <!-- <a-button type="primary" shape="circle" @click="testDialog" >T</a-button> -->
  </span>
  <!-- <BasicDrawer title="Page Schema" width="50%" @register="register" showFooter @ok="handleOk">
    <CodeEditor :value="schemaValue" @update:value="updateValue" mode="application/json" />
  </BasicDrawer> -->
  <!-- <BasicModal title="Page Schema" @register="register" @ok="handleOk">
    <template #default>
      <CodeEditor :value="schemaValue" @update:value="updateValue" mode="application/json" />
    </template>

    <template #insertFooter>
      <a-button type="primary" danger @click="rebuild" >Rebuild</a-button>
    </template>
  </BasicModal> -->

  <el-dialog
    v-model="schemaVisible"
    title="Page Schema"
    width="600px"
    :height="500"
    :center="true"
    class="debug-modal"
    :mask="false"
    :maskClosable="false"
    :draggable="true"
    :footer="null"
    :append-to-body="true"
    destroyOnClose
  >
    <AmisSchemaPage
      :schema="debuggerSchema"
      :handleOk="handleOk"
      :data="schemaData"
      :handleInvoke="handleInvoke"
      :handleCancel="handleCancel"
      :handleChange="handleChange"
    />
  </el-dialog>

  <el-dialog
    :destroyOnClose="true"
    class="amis-full-screen"
    v-model="designerVisible"
    :maskClosable="false"
    :append-to-body="true"
    width="100%"
    height="100%"
    :align-center="true"
    :fullscreen="true"
    :footer="null"
    :closable="false" :keyboard="false"
  >
  <header></header>
    <AmisEditor :path="path" @exit="handleEditorExit" />
  </el-dialog>
</template>

<style lang="less">
.debug-modal .scroll-container {
  padding: 0;
}

.amis-full-screen .el-dialog__body{
  height:100%;
  margin:0;
  padding:0;
}

.amis-full-screen .el-dialog__header{
  display:none
}

.amis-debugger {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 100;
}
</style>

<script lang="ts" setup>
import { shallowRef, ref } from 'vue';
import { ElDialog,ElButton } from 'element-plus';

import AmisSchemaPage from './AmisSchemaPage.vue';
import debuggerSchema from './debugger.json';
import yaml from 'js-yaml';

import AmisEditor from './AmisEditor.vue';

const props = defineProps({
  path: String,
  schema: Object,
});

const emit = defineEmits(['update:schema', 'rebuild']);

function handleChange(data: any) {
  let json = schemaData.value.lang == 'yaml' ? yaml.load(data.schema) : JSON.parse(data.schema);
  emit('update:schema', json);
}

const schemaVisible = ref(false);

const schemaData = shallowRef({
  schema: '',
  lang: 'json',
});

function openSchemaEditor() {
  schemaData.value = { schema: yaml.dump(props.schema), lang: 'yaml' };
  schemaVisible.value = true
}

function handleOk(data: any) {
  handleChange(data);
  schemaVisible.value = false
}

function handleInvoke(action: string, options: any) {
  if (action == 'rebuild') {
    emit('rebuild');
  } else if (action == 'toggleYaml') {
    let schema = options.data.schema;
    if (options.data.lang == 'yaml') {
      schemaData.value = { lang: 'json', schema: JSON.stringify(yaml.load(schema), null, '  ') };
    } else {
      schemaData.value = { lang: 'yaml', schema: yaml.dump(JSON.parse(schema)) };
    }
  }
}

function handleCancel() {
  schemaVisible.value = false
}

const designerVisible = ref(false);

function openAmisEditor() {
  designerVisible.value = true;
}

function handleEditorExit() {
  designerVisible.value = false;
}

</script>
