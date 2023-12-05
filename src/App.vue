<script setup lang="ts">
import FuelCost from '@/components/FuelCost.ce.vue'
import Payslip from '@/components/Payslip.ce.vue'
import PropertyTaxes from '@/components/PropertyTaxes.ce.vue'
import Vat from '@/components/Vat.ce.vue'
</script>

<template>
  <main>
    <FuelCost service-root="http://localhost:8080" />
    <Payslip
        service-root="http://localhost:8080"
        option-data='[["2022-07", "2022/23 Tax Year Calculation (from July)"],["2022-04", "2022/23 Tax Year Calculation (April to July)"], ["2021", "2021/22 Tax Year Calculation"]]'
    />
    <PropertyTaxes
      service-root="http://localhost:8080"
      option-data='[["2021","1st April 2021 to 30th June 2021"],["2020","8th July 2020 to 31st March 2021"]]'
    />
    <Vat service-root="http://localhost:8080" />
  </main>
</template>

<style lang="scss">
@import '@/scss/globals.scss';
</style>
