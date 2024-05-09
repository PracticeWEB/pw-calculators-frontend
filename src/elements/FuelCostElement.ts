import { defineCustomElement } from 'vue'
import FuelCost from '@/components/FuelCost.ce.vue'

const fuelCostElement = defineCustomElement(FuelCost)
customElements.define('pwcalculator-fuelcost', fuelCostElement)
