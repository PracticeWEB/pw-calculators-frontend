<!--
Vat calculator component.
-->
<template>
  <div class="calculator-container pw-calc" part="pwcalculator">
    <div class="content-container">
      <form class="input" @submit.prevent="submitCalculation">
        <div class="pw-calc-header">
          <h3 class="pw-calc-header__title">VAT Calculator</h3>
        </div>
        <fieldset class="form-item">
          <p class="form-item__title">Value *</p>
          <div class="form-item__wrapper form-item__wrapper--gross flex-wrap">
            <span class="form-item__character form-item__character--pound">&#163;</span>
            <input
              class="form-item__input form-item__input--number"
              border-left
              type="number"
              step="0.01"
              min="0"
              required
              v-model.number="input.value"
              placeholder="Enter your value here"
            />
          </div>
        </fieldset>
        <fieldset class="form-item">
          <p class="form-item__title">VAT included? *</p>
          <div class="form-item__wrapper form-item__wrapper--mobile flex-wrap">
            <label
              class="form-item__label form-item__label--radio-spacing"
              :class="{ active: input.included == 1 }"
            >
              <input type="radio" v-model="input.included" value="1" />Yes
            </label>
            <label
              class="form-item__label form-item__label--radio-spacing"
              :class="{ active: input.included == 0 }"
            >
              <input type="radio" v-model="input.included" value="0" />No
            </label>
          </div>
        </fieldset>
        <button type="submit" class="pw-calc-button btn et_pb_button" part="pwcalculator-button">Calculate</button>
      </form>
      <br />
      <div class="pw-calc-output" v-if="processed">
        <div class="pw-calc-output__wrapper flex flex-wrap">
          <dt class="pw-calc-output__item pw-calc-output__item--label">Net:</dt>
          <dd class="pw-calc-output__item pw-calc-output__item--value">
            {{ outputFormatted.net }}
          </dd>
          <dt class="pw-calc-output__item pw-calc-output__item--label">VAT:</dt>
          <dd class="pw-calc-output__item pw-calc-output__item--value">
            {{ outputFormatted.vat }}
          </dd>
          <dt class="pw-calc-output__item pw-calc-output__item--label">Gross:</dt>
          <dd class="pw-calc-output__item pw-calc-output__item--value">
            {{ outputFormatted.gross }}
          </dd>
        </div>
        <div class="pw-calc-disclaimer">
          <p>
            This calculator is solely for estimative purposes and no warranty is given as to the
            accuracy or completeness of any information. You should not make decisions based on
            results from this calculator. Talk to us for expert advice.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import currencyFormatter from '@/composables/CurrencyFormatter'
import { computed, ref } from 'vue'

// Define types.
type VatInput = {
  included: number | boolean
  value: number
}
type VatOutput = {
  gross: number
  net: number
  vat: number
}
// TODO add boolean to type to reflect processed?

const props = defineProps(['serviceRoot'])

const input = ref<VatInput>({
  included: 0,
  value: 0
})
const output = ref<VatOutput>({ gross: 0, net: 0, vat: 0 })
const processed = ref(false)

// Use computed prop to format the output values.
const outputFormatted = computed(() => {
  return {
    gross: currencyFormatter(output.value.gross),
    net: currencyFormatter(output.value.net),
    vat: currencyFormatter(output.value.vat)
  }
})

async function submitCalculation() {
  const url = `${props.serviceRoot}/calculator/vat`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input.value)
  })

  const result = await response.json()
  output.value = result
  processed.value = true
}
</script>
<style lang="scss">
@import '@/scss/globals.scss';
</style>
