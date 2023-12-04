<script setup lang="ts">
import FuelCost from '@/components/FuelCost.ce.vue'
import Payslip from '@/components/Payslip.ce.vue'
import PropertyTaxes from '@/components/PropertyTaxes.ce.vue'
import Vat from '@/components/Vat.ce.vue'
</script>

<template>
  <main>
    <FuelCost service-root="http://localhost:8080" />
    <Payslip service-root="http://localhost:8080" />
    <PropertyTaxes
      service-root="http://localhost:8080"
      option-data='[["2021","1st April 2021 to 30th June 2021"],["2020","8th July 2020 to 31st March 2021"]]'
    />
    <Vat service-root="http://localhost:8080" />
  </main>
</template>

<style scoped></style>
