<template>
  <div class="practiceweb-calculator" part="pwcalculator">
    <div class="pw-calc-header">
      <h3 class="pw-calc-header__title">Payslip Calculator</h3>
    </div>
    <form class="input input--width" @submit.prevent="submitCalculation">
      <fieldset class="form-item">
        <p class="form-item__title">Gross Pay *</p>
        <div class="form-item__wrapper form-item__wrapper--gross flex-wrap">
          <span class="form-item__character form-item__character--pound">&#163;</span>
          <input name="grossPay" type="number" required min="1" step="0.01" v-model.number="input.grossPay" class="form-item__input form-item__input--number border-left" placeholder="Enter gross pay"/>
          <label class="form-item__label flex-grow border-left" :class="{active: input.period === 'annual'}">
            <input type="radio" v-model="input.period" value="annual" class="form-item__input form-item__input--radio form-item__input--radio--hidden"/>Annual
          </label>
          <label class="form-item__label flex-grow border-left" :class="{active: input.period === 'month'}">
            <input type="radio" v-model="input.period" value="month" class="form-item__input form-item__input--radio form-item__input--radio--hidden"/>Monthly
          </label>
          <label class="form-item__label flex-grow border-left" :class="{active: input.period === 'week'}">
            <input type="radio" v-model="input.period" value="week" class="form-item__input form-item__input--radio form-item__input--radio--hidden"/>Weekly
          </label>
        </div>
      </fieldset>
      <fieldset class="form-item">
        <p class="form-item__title">Where do you pay income Tax? *</p>
        <div class="form-item__wrapper form-item__wrapper--mobile flex-wrap">
          <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.region === 'england'}">
            <input type="radio" v-model="input.region" value="england" class="form-item__input form-item__input--radio"/>England, Wales, Northern Ireland
          </label>
          <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.region === 'scotland'}">
            <input type="radio" v-model="input.region" value="scotland" class="form-item__input form-item__input--radio"/>Scotland
          </label>
        </div>
      </fieldset>
      <fieldset class="form-item">
        <p class="form-item__title">Percentage of salary paid into pension</p>
        <div class="form-item__wrapper">
          <div class="flex">
            <input type="number" min="0" v-model.number="input.pensionPercentage" class="form-item__input form-item__input--number">
            <span class="form-item__character form-item__character--percent inline border-left">&#37;</span>
          </div>
        </div>
      </fieldset>
      <fieldset class="form-item">
        <p class="form-item__title">Pension scheme</p>
        <div class="form-item__wrapper form-item__wrapper--two">
          <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.pensionType === 'auto'}">
            <input type="radio" v-model="input.pensionType" value="auto" class="form-item__input form-item__input--radio"/>Auto-enrolment
          </label>
          <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.pensionType === 'employer'}">
            <input type="radio" v-model="input.pensionType" value="employer" class="form-item__input form-item__input--radio"/>Employer
          </label>
          <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.pensionType === 'sacrifice'}">
            <input type="radio" v-model="input.pensionType" value="sacrifice" class="form-item__input form-item__input--radio"/>Salary sacrifice
          </label>
          <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.pensionType === 'personal'}">
            <input type="radio" v-model="input.pensionType" value="personal" class="form-item__input form-item__input--radio"/>Personal
          </label>
        </div>
        <div v-if="input.pensionType === 'sacrifice'">
          <p>Has the sacrifice been applied above?<input type="checkbox" v-model="input.salarySacrificeApplied"></p>
        </div>
      </fieldset>
      <fieldset class="form-item">
        <p class="form-item__title">Student Loan?</p>
        <div class="form-item__wrapper form-item__wrapper--loan--two form-item__wrapper--mobile">
          <fieldset class="form-item">
            <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.hasStudentLoan === true}">
              <input type="checkbox" v-model="input.hasStudentLoan" class="form-item__input form-item__input--radio"/>Are you repaying a student loan?
            </label>
          </fieldset>
          <fieldset class="form-item" v-if="input.hasStudentLoan">
            <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.studentLoan2012 === 'before'}">
              <input type="radio" v-model="input.studentLoan2012" value="before" class="form-item__input form-item__input--radio"/>Before 1st Sept 2012
            </label>
            <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.studentLoan2012 === 'after'}">
              <input type="radio" v-model="input.studentLoan2012" value="after" class="form-item__input form-item__input--radio"/>After 1st Sept 2012
            </label>
          </fieldset>
          <fieldset class="form-item" v-if="input.studentLoan2012 === 'after'">
            <p class="form-item__title">Where did you live when you applied for the loan?</p>
            <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.studentLoanLocation === 'england'}">
              <input type="radio" v-model="input.studentLoanLocation" value="england" class="form-item__input form-item__input--radio"/>England or Wales
            </label>
            <label class="form-item__label form-item__label--radio-spacing"  :class="{active: input.studentLoanLocation === 'scotland'}">
              <input type="radio" v-model="input.studentLoanLocation" value="scotland" class="form-item__input form-item__input--radio"/>Scotland or Northern Ireland
            </label>
            <p v-if="studentLoanPlan !== 'none'">You will be covered under {{ studentLoanPlan }}</p>
          </fieldset>
        </div>
      </fieldset>
      <fieldset class="form-item">
        <p class="form-item__title">Tax year:</p>
        <div class="form-item__wrapper form-item__wrapper--year-selector  flex-wrap">
          <label v-for="[date_key, date_value] in options" :key="date_key" class="form-item__label flex-grow" :class="{active: input.date === date_key}" >
            <input type="radio" v-model="input.date" :value="date_key" class="form-item__input form-item__input--radio form-item__input--radio--hidden" />
            {{ date_value }}
          </label>
        </div>
      </fieldset>
      <button type="submit" class="pw-calc-button btn et_pb_button" part="pwcalculator-button">Calculate</button>
    </form>
    <div class="pw-calc-output pw-calc-output__width pw-calc-output--tabs"  v-if="processed">
        <p class="pw-calc-output__description">Results based on <strong>{{ resultPeriod }}</strong> Gross pay of <span>{{ resultGrossPay }}</span></p>
      <tabs>
        <tab v-for="(tabname, tabkey) in tabNames"  :name="tabname" :key="tabkey">
          <dl>
            <div class="pw-calc-output__main">
              <dt class="pw-calc-output__item pw-calc-output__item-title">Net Pay:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ outputFormatted[tabkey]["netPay"] }} </dd>
            </div>
            <p class="pw-calc-output__values-header">Breakdown</p>
            <div class="pw-calc-output__wrapper">
              <dt class="pw-calc-output__item pw-calc-output__item--label">PAYE Deduction:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ outputFormatted[tabkey]["payeDeduction"] }}</dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">NI Deduction:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ outputFormatted[tabkey]["niDeduction"] }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Student Loan Deduction:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ outputFormatted[tabkey]["studentLoanDeduction"] }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Employers NI:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ outputFormatted[tabkey]["employerContribution"] }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Employers Cost:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ outputFormatted[tabkey]["employerCost"] }} </dd>
              <dt class="pw-calc-output__item pw-calc-output__item--label">Pension contributions:</dt><dd class="pw-calc-output__item pw-calc-output__item--value">{{ outputFormatted[tabkey]["pensionContribution"] }}</dd>
            </div>
          </dl>
        </tab>
      </tabs>
      <div class="pw-calc-disclaimer">
        <p>This calculator is solely for estimative purposes and no warranty is given as to the accuracy or completeness of any information. You should not make decisions based on results from this calculator. Talk to us for expert advice.</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import {ref, computed, watch, onMounted} from "vue";
import currencyFormatter from "@/composables/CurrencyFormatter";
// @ts-ignore
import {Tab, Tabs} from 'vue3-tabs-component';

type payslipInput = {
  date: string;
  grossPay: number,
  period: string,
  region: string,
  pensionPercentage: number,
  pensionType: string,
  salarySacrificeApplied: boolean,
  studentLoanLocation: string,
  studentLoan2012: string,
  hasStudentLoan: boolean,
  studentLoanPlan: string;
};
type payslipOutputPeriod = {
  netPay: number,
  payeDeduction: number,
  niDeduction: number,
  studentLoanDeduction: number,
  employerContribution: number,
  employerCost: number,
  pensionContribution: number,
};
type payslipOutput = {
  annual: payslipOutputPeriod,
  month: payslipOutputPeriod,
  week: payslipOutputPeriod
}

const props = defineProps({
  serviceRoot: {
    type: String,
    required: true,
  },
  optionData: {
    type: String,
    default: "[[\"2022-07\", \"2022/23 Tax Year Calculation (from July)\"],[\"2022-04\", \"2022/23 Tax Year Calculation (April to July)\"], [\"2021\", \"2021/22 Tax Year Calculation\"]]",
  },
  defaultOption: {
    type: String,
  }
});

const input = ref<payslipInput>({
  salarySacrificeApplied: false,
  date: "",
  grossPay: 0,
  pensionPercentage: 0,
  pensionType: "auto",
  period: "annual",
  region: "england",
  hasStudentLoan: false,
  studentLoan2012: "after",
  studentLoanPlan: "none",
  studentLoanLocation: "england"
});

const tabNames ={
  annual: 'Annually',
  month: 'Monthly',
  week: 'Weekly'
};
const output = ref<payslipOutput>({
  annual: {
    employerContribution: 0, employerCost: 0, netPay: 0, niDeduction: 0, payeDeduction: 0, pensionContribution: 0, studentLoanDeduction: 0
  },
  month: {
    employerContribution: 0, employerCost: 0, netPay: 0, niDeduction: 0, payeDeduction: 0, pensionContribution: 0, studentLoanDeduction: 0
  },
  week: {
    employerContribution: 0, employerCost: 0, netPay: 0, niDeduction: 0, payeDeduction: 0, pensionContribution: 0, studentLoanDeduction: 0
  }
});

const processed= ref(false);

const options = computed(() => {
  if (typeof props.optionData === 'string') {
    return JSON.parse(props.optionData);
  } else {
    return [];
  }
})

const outputFormatted = computed(() => {
  const formatted = new Map();
  for (const period of ['week', 'month','annual']) {
    const periodMap = new Map();
    // Cast to a key.
    const periodKey: keyof payslipOutput = period as keyof payslipOutput;
    for (const field of ['employerContribution', 'employerCost', 'netPay', 'niDeduction', 'payeDeduction', 'pensionContribution', 'studentLoanDeduction']) {
      const fieldKey: keyof payslipOutputPeriod = field as keyof payslipOutputPeriod;
      const value = output.value[periodKey][fieldKey];
      periodMap.set(field, currencyFormatter(value));
    }
    formatted.set(period, Object.fromEntries(periodMap.entries()));
  }
  return Object.fromEntries(formatted.entries());
});

const studentLoanPlan = computed(() => {
  let loanPlan = 'none';
  if ( input.value.hasStudentLoan ) {
    loanPlan = 'plan1';
    if (input.value.studentLoan2012 === 'after' && input.value.studentLoanLocation === 'england') {
      loanPlan = 'plan2';
    }
  }
  return loanPlan;
});

const resultPeriod = computed(() => {
  return input.value.period;
});
const resultGrossPay = computed(() => {
  return currencyFormatter(input.value.grossPay);
});

// Watch loan plan to copy it back into the input.
watch(studentLoanPlan, plan => {
  input.value.studentLoanPlan = plan;
});

async function submitCalculation() {
  const url = `${props.serviceRoot}/calculator/payslip`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input.value)
  })
  const result = await response.json();
  output.value = result;
  processed.value = true;
}

onMounted(() => {
  if (props.defaultOption) {
    input.value.date = props.defaultOption;
  } else if(typeof props.optionData === 'string') {
    // Parse the json and try to pick a default. Note we are duplicating the computed options.
    const options = JSON.parse(props.optionData);
    if ( Array.isArray(options)  && Array.isArray(options[0])) {
      input.value.date = options[0][0];
    }
  }
})


</script>
<style lang="scss">
@import '@/scss/globals.scss';
</style>
