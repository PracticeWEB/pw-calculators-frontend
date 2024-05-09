import { defineCustomElement } from 'vue'
import Payslip from '@/components/Payslip.ce.vue'

const payslipElement = defineCustomElement(Payslip)
customElements.define('pwcalculator-payslip', payslipElement)
