import { defineCustomElement } from 'vue'
import Vat from '@/components/Vat.ce.vue'

const vatElement = defineCustomElement(Vat)
customElements.define('pwcalculator-vat', vatElement)
