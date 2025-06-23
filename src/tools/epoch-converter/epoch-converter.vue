<script setup lang="ts">
import { ref } from 'vue';
import { dateToEpoch, epochToDate } from './epoch-converter.service.ts';

const epochInput = ref('');
const dateOutput = ref('');
const epochOutput = ref('');
const error = ref<string | null>(null);

const dateParts = ref({
  year: '',
  month: '',
  day: '',
  hour: '',
  minute: '',
  second: '',
});

function convertEpochToDate() {
  error.value = null;
  try {
    dateOutput.value = epochToDate(epochInput.value);
  }
  catch (e: any) {
    error.value = e.message;
  }
}

function convertDateToEpoch() {
  error.value = null;
  try {
    const { year, month, day, hour, minute, second } = dateParts.value;

    const isoString = `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}`;
    epochOutput.value = dateToEpoch(isoString);
  }
  catch (e: any) {
    error.value = e.message;
  }
}

function pad(value: string): string {
  return value.toString().padStart(2, '0');
}
</script>

<template>
  <c-card title="Epoch Time Converter (24 hour time format)" class="mx-auto max-w-4xl px-4">
    <!-- Epoch to Date -->
    <div class="mb-8">
      <div class="mb-2 font-semibold">
        Epoch to Date
      </div>
      <c-input-text
        v-model:value="epochInput"
        placeholder="Enter epoch timestamp (e.g. 1718822594)"
        class="mb-4"
        raw-text
      />
      <c-button @click="convertEpochToDate">
        Convert to Date
      </c-button>

      <div v-if="dateOutput" class="mt-4 text-sm text-green-400">
        Human-Readable Date: <strong>{{ dateOutput }}</strong>
      </div>
    </div>

    <!-- Date to Epoch -->
    <div class="mb-8">
      <div class="mb-2 font-semibold">
        Date to Epoch
      </div>

      <div class="mb-4 max-w-sm space-y-3">
        <div class="flex items-center">
          <label class="w-24 text-sm font-medium">Year:</label>
          <c-input-text v-model:value="dateParts.year" placeholder="YYYY" class="ml-auto w-32" />
        </div>
        <div class="flex items-center">
          <label class="w-24 text-sm font-medium">Month:</label>
          <c-input-text v-model:value="dateParts.month" placeholder="MM" class="ml-auto w-24" />
        </div>
        <div class="flex items-center">
          <label class="w-24 text-sm font-medium">Day:</label>
          <c-input-text v-model:value="dateParts.day" placeholder="DD" class="ml-auto w-24" />
        </div>
        <div class="flex items-center">
          <label class="w-24 text-sm font-medium">Hour:</label>
          <c-input-text v-model:value="dateParts.hour" placeholder="HH" class="ml-auto w-24" />
        </div>
        <div class="flex items-center">
          <label class="w-24 text-sm font-medium">Minute:</label>
          <c-input-text v-model:value="dateParts.minute" placeholder="MM" class="ml-auto w-24" />
        </div>
        <div class="flex items-center">
          <label class="w-24 text-sm font-medium">Second:</label>
          <c-input-text v-model:value="dateParts.second" placeholder="SS" class="ml-auto w-24" />
        </div>
      </div>

      <c-button @click="convertDateToEpoch">
        Convert to Epoch
      </c-button>

      <div v-if="epochOutput" class="mt-4 text-sm text-green-400">
        Epoch Timestamp: <strong>{{ epochOutput }}</strong>
      </div>
    </div>

    <c-alert v-if="error" type="error" class="mt-6">
      {{ error }}
    </c-alert>
  </c-card>
</template>
