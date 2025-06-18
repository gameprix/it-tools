<script lang="ts" setup>
import { ref } from 'vue';
import { decompress } from './gzip-decompressor.service';

const userInput = ref('');
const decompressedOutput = ref('');
const error = ref<string | null>(null);

const inputKey = ref(0);
const outputKey = ref(0);

function clearAll() {
  userInput.value = '';
  decompressedOutput.value = '';
  error.value = null;

  inputKey.value++;
  outputKey.value++;
}

watch(userInput, async (val) => {
  error.value = null;
  decompressedOutput.value = '';

  if (!val.trim()) {
    return;
  }

  try {
    decompressedOutput.value = await decompress(val);
  }
  catch (err: any) {
    error.value = 'Decompression failed. Please ensure the input is valid GZip.';
  }
});
</script>

<template>
  <c-card title="GZip Decompressor">
    <div class="mb-2">
      GZipped User Input
    </div>
    <c-input-text
      :key="inputKey"
      v-model:value="userInput"
      placeholder="Paste your GZipped string here..."
      rows="6"
      class="mb-6"
      multiline autosize raw-text monospace max-h-64 overflow-y-auto
    />

    <c-alert v-if="error" type="error" title="Error while decompressing" class="mt-4">
      {{ error }}
    </c-alert>

    <div class="mb-2 mt-2">
      Decompressed Output
    </div>
    <c-input-text
      :key="outputKey"
      :value="decompressedOutput"
      placeholder=""
      rows="6"
      readonly multiline autosize monospace max-h-128 overflow-y-auto
    />
  </c-card>

  <div class="mt-2">
    <c-button @click="clearAll">
      Clear
    </c-button>
  </div>
</template>
