import { defineCustomElement } from 'vue'
import PropertyTaxes from '@/components/PropertyTaxes.ce.vue'

const propertyTaxesElement = defineCustomElement(PropertyTaxes)
customElements.define('pwcalculator-propertytaxes', propertyTaxesElement)
