<!--
Property Taxes calculator component.
Property Taxes covers both Stamp Duty and Land  & Buildings Transaction Tax ( LBTT).
-->
<template>
  <div class="practiceweb-calculator" part="pwcalculator">
    <div class="content-container">
      <div class="pw-calc-header">
        <h3 class="pw-calc-header__title">{{ dutyName }}</h3>
      </div>
      <form class="input" @submit.prevent="submitCalculation">
        <fieldset class="form-item">
          <p class="form-item__title">Region:</p>
          <div class="form-item__wrapper form-item__wrapper--mobile flex-wrap">
            <label
              class="form-item__label form-item__label--radio-spacing"
              :class="{ active: input.region === 'england' }"
            >
              <input
                type="radio"
                v-model="input.region"
                value="england"
                class="form-item__input form-item__input--radio form-item__input--radio"
              />England & Northern Ireland
            </label>
            <label
              class="form-item__label form-item__label--radio-spacing"
              :class="{ active: input.region === 'wales' }"
            >
              <input
                type="radio"
                v-model="input.region"
                value="wales"
                class="form-item__input form-item__input--radio"
              />Wales
            </label>
            <label
              class="form-item__label form-item__label--radio-spacing"
              :class="{ active: input.region === 'scotland' }"
            >
              <input
                type="radio"
                v-model="input.region"
                value="scotland"
                class="form-item__input form-item__input--radio"
              />Scotland
            </label>
          </div>
        </fieldset>
        <fieldset class="form-item">
          <p class="form-item__title">Type of property:</p>
          <div class="form-item__wrapper form-item__wrapper--mobile flex-wrap">
            <label
              class="form-item__label form-item__label--radio-spacing"
              :class="{ active: input.type === 'residential' }"
            >
              <input
                type="radio"
                v-model="input.type"
                value="residential"
                class="form-item__input form-item__input--radio"
              />Residential
            </label>
            <label
              class="form-item__label form-item__label--radio-spacing"
              :class="{ active: input.type === 'nonresidential' }"
            >
              <input
                type="radio"
                v-model="input.type"
                value="nonresidential"
                class="form-item__input form-item__input--radio"
              />Non-residential
            </label>
          </div>
        </fieldset>
        <fieldset class="form-item">
          <p class="form-item__title">Are you a first time buyer?</p>
          <div class="form-item__wrapper form-item__wrapper--mobile flex-wrap">
            <label
              class="form-item__label form-item__label form-item__label--radio-spacing"
              :class="{ active: input.firstTime === 'yes' }"
            >
              <input
                type="radio"
                v-model="input.firstTime"
                value="yes"
                class="form-item__input form-item__input--radio"
              />Yes
            </label>
            <label
              class="form-item__label form-item__label--radio-spacing"
              :class="{ active: input.firstTime === 'no' }"
            >
              <input
                type="radio"
                v-model="input.firstTime"
                value="no"
                class="form-item__input form-item__input--radio"
              />No
            </label>
          </div>
        </fieldset>
        <fieldset class="form-item">
          <p class="form-item__title">Property Value</p>
          <div class="form-item__wrapper form-item__wrapper--mobile flex-wrap">
            <input
              name="propertyValue"
              required
              type="number"
              min="1"
              step="0.01"
              v-model.number="input.propertyValue"
              class="form-item__input form-item__input--number"
              placeholder="Enter your property value here"
            />
          </div>
        </fieldset>
        <fieldset class="form-item">
          <p class="form-item__title">Transaction Date:</p>
          <div class="form-item__wrapper form-item__wrapper--year-selector flex-wrap">
            <label
              class="form-item__label flex-grow"
              v-for="[date_key, date_value] in options"
              :key="date_key"
              :class="{ active: input.date === date_key }"
            >
              <input
                type="radio"
                v-model="input.date"
                :value="date_key"
                class="form-item__input form-item__input--radio form-item__input--radio--hidden"
              />
              {{ date_value }}
            </label>
          </div>
        </fieldset>
        <button type="submit" class="pw-calc-button btn et_pb_button" part="pwcalculator-button">Calculate</button>
      </form>
      <br />
      <div class="pw-calc-output" v-if="processed">
        <div class="pw-calc-output__wrapper flex flex-wrap">
          <dt class="pw-calc-output__item pw-calc-output__item--label inline">{{ dutyName }}:</dt>
          <dd class="pw-calc-output__item pw-calc-output__item--value inline">
            {{ outputFormatted.duty }}
          </dd>
          <dt
            class="pw-calc-output__item pw-calc-output__item--label inline property-output"
            v-if="output.secondHomeDuty"
          >
            Second Home Duty:
          </dt>
          <dd
            class="pw-calc-output__item pw-calc-output__item--value inline"
            v-if="output.secondHomeDuty"
          >
            {{ outputFormatted.secondHomeDuty }}
          </dd>
        </div>
        <div class="pw-calc-disclaimer">
          <p>
            From July 2020, a stamp duty land tax holiday reduces the rate to 0% for the purchase of
            all residential properties worth up £500,000 in England and Northern Ireland. In Wales
            and Scotland, the 0% rate applies on the purchase of all residential properties worth up
            to £250,000. These breaks apply until 31 March 2021, subject to future change.
          </p>
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
import {computed, onMounted, ref} from 'vue'
import currencyFormatter from '@/composables/CurrencyFormatter'

// Defne types.
type propertyInput = {
  region: string
  type: string
  propertyValue: number
  firstTime: string
  date: number | string
}
type propertyOutput = {
  duty: number
  secondHomeDuty: number
}

const props = defineProps({
  serviceRoot: {
    type: String,
    required: true,
  },
  optionData: {
    type: String,
    default: "[[\"2021-10\", \"From 1st October 2021\"],[\"2021-07\", \"1st July 2021 to 30th September 2021\"],[\"2021\",\"1st April 2021 to 30th June 2021\"],[\"2020\",\"8th July 2020 to 31st March 2021\"]]",
  },
  defaultOption: {
    type: String,
  }
});

const input = ref<propertyInput>({
  region: 'england',
  type: 'residential',
  propertyValue: 30000,
  firstTime: 'no',
  date: new Date().getFullYear()
})

const output = ref<propertyOutput>({ duty: 0, secondHomeDuty: 0 })
const processed = ref(false)

const dutyName = computed(() => {
  let dutyName = 'Stamp Duty'
  switch (input.value.region) {
    case 'wales':
      dutyName = 'Land Transaction Tax'
      break
    case 'scotland':
      dutyName = 'Land and Buildings Transaction Tax'
      break
  }
  return dutyName
})

const options = computed(() => {
  const options = typeof props.optionData !== 'undefined' ? JSON.parse(props.optionData) : [];
  return options
})

// Use computed prop to format the output values.
const outputFormatted = computed(() => {
  return {
    duty: currencyFormatter(output.value.duty),
    secondHomeDuty: currencyFormatter(output.value.secondHomeDuty)
  }
})

async function submitCalculation() {
  const url = `${props.serviceRoot}/calculator/propertytaxes`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input.value)
  })
  const result = await response.json()
  output.value = result
  processed.value = true;
}

onMounted(() => {
  if (props.defaultOption) {
    input.value.date = props.defaultOption;
  } else if(typeof props.optionData !== 'undefined') {
    // Parse the json and try to pick a default. Note we are duplicating the computed options.
    const options = JSON.parse(props.optionData);
    if (options[0][0]) {
      input.value.date = options[0][0];
    }
  }
})

</script>

<style lang="scss">
@import '@/scss/globals.scss';
</style>
